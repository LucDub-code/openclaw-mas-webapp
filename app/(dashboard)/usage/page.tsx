import {
  Tabs, TabsList, TabsTrigger, TabsContent,
} from "@/components/ui/tabs"
import { sql } from "@/lib/db"
import { UsageTable, type UsageRow } from "@/components/UsageTable"

export const dynamic = "force-dynamic"

export default async function UsagePage() {
  const cycles = (await sql`
    SELECT to_char(date, 'YYYY-MM-DD') AS id,
           MAX(date) AS date,
           SUM(tokens_entree)::int AS tokens_entree,
           SUM(tokens_sortie)::int AS tokens_sortie,
           SUM(tokens_total)::int AS tokens_total
    FROM conso.appels
    WHERE scenario = 'auto'
    GROUP BY to_char(date, 'YYYY-MM-DD')
    ORDER BY id DESC
  `) as UsageRow[]

  // Une question Telegram = un trace_id, partagé par tous les appels qu'elle
  // déclenche (orchestrateur et sous-agents). C'est l'identifiant fourni par
  // OpenClaw, contrairement au session_id qui ne distingue pas les questions.
  const responses = (await sql`
    SELECT trace_id AS id,
           MAX(date) AS date,
           SUM(tokens_entree)::int AS tokens_entree,
           SUM(tokens_sortie)::int AS tokens_sortie,
           SUM(tokens_total)::int AS tokens_total
    FROM conso.appels
    WHERE scenario = 'telegram'
      AND trace_id IS NOT NULL
    GROUP BY trace_id
    ORDER BY date DESC
  `) as UsageRow[]

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="mb-4 md:mb-6 text-xl font-semibold md:text-2xl">Suivi conso</h1>

      <Tabs defaultValue="cycles">
        <TabsList className="flex w-full gap-1 mb-4 md:mb-6">
          <TabsTrigger value="cycles" className="cursor-pointer">Cycles</TabsTrigger>
          <TabsTrigger value="telegram" className="cursor-pointer">Réponses Telegram</TabsTrigger>
        </TabsList>

        <TabsContent value="cycles">
          <UsageTable
            rows={cycles}
            columnLabel="Cycle"
            rowPrefix="Cycle du"
            hrefBase="/usage/cycle"
          />
        </TabsContent>

        <TabsContent value="telegram">
          <UsageTable
            rows={responses}
            columnLabel="Réponse"
            rowPrefix="Réponse du"
            hrefBase="/usage/response"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
