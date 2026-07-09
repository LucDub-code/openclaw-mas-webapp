import Link from "next/link"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { buttonVariants } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export type UsageRow = {
  session_id: string
  date: string
  tokens_entree: number
  tokens_sortie: number
  tokens_total: number
}

type UsageTableProps = {
  rows: UsageRow[]
  columnLabel: string 
  rowPrefix: string  
  hrefBase: string 
}

export const UsageTable = ({ rows, columnLabel, rowPrefix, hrefBase }: UsageTableProps) => {
  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="[&>th]:bg-violet-dark [&_th]:text-primary-foreground [&>th:first-child]:rounded-tl-lg [&>th:last-child]:rounded-tr-lg">
            <TableHead>{columnLabel}</TableHead>
            <TableHead className="text-right">Entrée</TableHead>
            <TableHead className="text-right">Sortie</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-center">Détail</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r, index) => (
            <TableRow
              key={r.session_id}
              className={`${
                index % 2 === 0 ? "bg-row hover:bg-row" : "bg-row-alt hover:bg-row-alt"
              } ${index === rows.length - 1 ? "rounded-b-lg" : ""}`}
            >
              <TableCell>
                <span className="hidden md:inline">{rowPrefix} </span>
                {new Date(r.date).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell className="text-right">
                {r.tokens_entree.toLocaleString("fr-FR")}
              </TableCell>
              <TableCell className="text-right">
                {r.tokens_sortie.toLocaleString("fr-FR")}
              </TableCell>
              <TableCell className="font-medium text-right">
                {r.tokens_total.toLocaleString("fr-FR")}
              </TableCell>
              <TableCell className="text-center">
                <Link
                  href={`${hrefBase}/${r.session_id}`}
                  className={buttonVariants({
                    size: "sm",
                    className: "bg-violet text-primary-foreground hover:bg-violet-dark",
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
  )
}
