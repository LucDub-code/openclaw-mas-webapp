import {
  Tabs, TabsList, TabsTrigger, TabsContent,
} from "@/components/ui/tabs"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { sql } from "@/lib/db"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export const dynamic = "force-dynamic"

type Cycle = {
  session_id: string
  date: string
  tokens_entree: number
  tokens_sortie: number
  tokens_total: number
}

export default async function UsagePage() {
  const cycles = (await sql`
    SELECT session_id,
           MAX(date) AS date,
           SUM(tokens_entree)::int AS tokens_entree,
           SUM(tokens_sortie)::int AS tokens_sortie,
           SUM(tokens_total)::int AS tokens_total
    FROM conso.appels
    WHERE scenario = 'auto'
    GROUP BY session_id
    ORDER BY date DESC
  `) as Cycle[]

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="mb-4 text-2xl font-semibold">Suivi conso</h1>

      <Tabs defaultValue="cycles">
        <TabsList className="flex w-full gap-1 mb-6 mt-2">
          <TabsTrigger value="cycles" className="cursor-pointer">Cycles</TabsTrigger>
          <TabsTrigger value="telegram" className="cursor-pointer">Réponses Telegram</TabsTrigger>
        </TabsList>

        <TabsContent value="cycles">
          <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow className="[&>th]:bg-violet-dark [&_th]:text-primary-foreground [&>th:first-child]:rounded-tl-lg [&>th:last-child]:rounded-tr-lg">
                <TableHead>Cycle</TableHead>
                <TableHead className="text-right">Entrée</TableHead>
                <TableHead className="text-right">Sortie</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-center">Détail</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cycles.map((c, index) => (
                <TableRow
                  key={c.session_id}
                  className={`${
                    index % 2 === 0 ? "bg-row hover:bg-row" : "bg-row-alt hover:bg-row-alt"
                  } ${
                    index === cycles.length - 1 ? "rounded-b-lg" : ""
                  }`}
                >
                  <TableCell>
                    Cycle du{" "}
                    {new Date(c.date).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    {c.tokens_entree.toLocaleString("fr-FR")}
                  </TableCell>
                  <TableCell className="text-right">
                    {c.tokens_sortie.toLocaleString("fr-FR")}
                  </TableCell>
                  <TableCell className="font-medium text-right">
                    {c.tokens_total.toLocaleString("fr-FR")}
                  </TableCell>
                  <TableCell className="text-center">
                    <Link
                      href={`/usage/cycle/${c.session_id}`}
                      className={buttonVariants({
                        size: "sm",
                        className:
                          "bg-violet text-primary-foreground hover:bg-violet-dark",
                      })}
                    >
                      Détail
                      <ArrowRight />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        </TabsContent>

        <TabsContent value="telegram">
          Onglet Réponses
        </TabsContent>
      </Tabs>
    </div>
  )
}
