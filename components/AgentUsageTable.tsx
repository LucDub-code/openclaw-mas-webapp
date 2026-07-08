import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"

export type AgentUsage = {
  agent: string
  tokens_entree: number
  tokens_sortie: number
  tokens_total: number
}

type AgentUsageTableProps = {
  rows: AgentUsage[]
}

export const AgentUsageTable = ({ rows }: AgentUsageTableProps) => {
  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="[&>th]:bg-violet-dark [&_th]:text-primary-foreground [&>th:first-child]:rounded-tl-lg [&>th:last-child]:rounded-tr-lg">
            <TableHead>Agent</TableHead>
            <TableHead className="text-right">Entrée</TableHead>
            <TableHead className="text-right">Sortie</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r, index) => (
            <TableRow
              key={r.agent}
              className={`${
                index % 2 === 0 ? "bg-row hover:bg-row" : "bg-row-alt hover:bg-row-alt"
              } ${index === rows.length - 1 ? "rounded-b-lg" : ""}`}
            >
              <TableCell>{r.agent}</TableCell>
              <TableCell className="text-right">
                {r.tokens_entree.toLocaleString("fr-FR")}
              </TableCell>
              <TableCell className="text-right">
                {r.tokens_sortie.toLocaleString("fr-FR")}
              </TableCell>
              <TableCell className="font-medium text-right">
                {r.tokens_total.toLocaleString("fr-FR")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
