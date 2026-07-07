import Link from "next/link"
import { sql } from "@/lib/db"

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
              className="block px-4 py-3 hover:underline"
            >
              Rapport consolidé du{" "}
              {new Date(report.date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
