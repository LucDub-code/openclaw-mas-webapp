import Link from "next/link"
import { sql } from "@/lib/db"

export const dynamic = "force-dynamic"

type Entree = {
  id: number
  date: string
}

export default async function Journal() {

  const entrees = (await sql`
  SELECT id, date
  FROM journal.entree
  ORDER BY date DESC
  `) as Entree[]

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-4 text-xl font-semibold md:text-2xl">Journal de test</h1>
      <ul className="rounded-lg border overflow-hidden">
        {entrees.map((entree, index) => (
          <li
            key={entree.id}
            className={index % 2 === 0 ? "bg-row" : "bg-row-alt"}
          >
            <Link
              href={`/journal/${entree.id}`}
              className={`flex items-center justify-between px-4 py-3 text-sm transition-shadow hover:ring-2 hover:ring-inset hover:ring-blue md:text-base ${index === 0 ? "rounded-t-lg" : ""
                } ${index === entrees.length - 1 ? "rounded-b-lg" : ""}`}
            >
              <span>
                Test du{" "}
                {new Date(entree.date).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
