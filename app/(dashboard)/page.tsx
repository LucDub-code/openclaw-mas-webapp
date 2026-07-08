import Link from "next/link"
import { sql } from "@/lib/db"
import { Badge } from "@/components/ui/badge"

export const dynamic = "force-dynamic"

type Report = {
  id: number
  date: string
}

export default async function Home() {

  const reports = (await sql`
  SELECT id, date
  FROM rapport.document
  ORDER BY date DESC
  `) as Report[]

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-4 text-2xl font-semibold">Rapports</h1>
      <ul className="rounded-lg border overflow-hidden">
        {reports.map((report, index) => (
          <li
            key={report.id}
            className={index % 2 === 0 ? "bg-row" : "bg-row-alt"}
          >
            <div className="flex items-center justify-between px-4 py-3">
              <Link
                href={`/reports/${report.id}`}
                className="hover:underline"
              >
                Rapport consolidé du{" "}
                {new Date(report.date).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </Link>
              {index === 0 && <Badge>nouveau</Badge>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
