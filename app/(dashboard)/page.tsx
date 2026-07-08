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
            <Link
              href={`/reports/${report.id}`}
              className={`flex items-center justify-between px-4 py-3 transition-shadow hover:ring-2 hover:ring-inset hover:ring-blue ${
                index === 0 ? "rounded-t-lg" : ""
              } ${index === reports.length - 1 ? "rounded-b-lg" : ""}`}
            >
              <span>
                Rapport consolidé du{" "}
                {new Date(report.date).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              {index === 0 && <Badge>nouveau</Badge>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
