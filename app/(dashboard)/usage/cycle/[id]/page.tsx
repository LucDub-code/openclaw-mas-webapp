import Link from "next/link"
import { notFound } from "next/navigation"
import { sql } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { AgentUsageTable, type AgentUsage } from "@/components/AgentUsageTable"

export const dynamic = "force-dynamic"

export default async function CycleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const rows = (await sql`
    SELECT agent,
           MAX(date) AS date,
           SUM(tokens_entree)::int AS tokens_entree,
           SUM(tokens_sortie)::int AS tokens_sortie,
           SUM(tokens_total)::int AS tokens_total
    FROM conso.appels
    WHERE scenario = 'auto'
      AND trace_id = ${id}
    GROUP BY agent
    ORDER BY tokens_total DESC
  `) as (AgentUsage & { date: string })[]

  if (rows.length === 0) notFound()

  return (
    <div className="mx-auto max-w-3xl">
      <Button
        render={<Link href="/usage" />}
        nativeButton={false}
        variant="outline"
        size="sm"
        className="mb-4 md:mb-6"
      >
        <ArrowLeft />
        Retour au suivi conso
      </Button>

      <h1 className="mb-4 sm:mb-6 text-xl md:text-2xl font-semibold">
        Détail du cycle du{" "}
        {new Date(rows[0].date).toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </h1>

      <AgentUsageTable rows={rows} />
    </div>
  )
}
