import Link from "next/link"
import { sql } from "@/lib/db"
import { Badge } from "@/components/ui/badge"

export const dynamic = "force-dynamic"

type Response = {
  id: number
  date: string
  question: string
}

export default async function ResponsesPage() {

  const responses = (await sql`
    SELECT id, date, question
    FROM repondeur.reponse
    ORDER BY date DESC
  `) as Response[]

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-4 text-xl font-semibold md:text-2xl">Réponses</h1>
      <ul className="rounded-lg border overflow-hidden">
        {responses.map((response, index) => (
          <li
            key={response.id}
            className={index % 2 === 0 ? "bg-row" : "bg-row-alt"}
          >
            <Link
              href={`/responses/${response.id}`}
              className={`flex items-center gap-4 px-4 py-3 text-sm transition-shadow hover:ring-2 hover:ring-inset hover:ring-blue md:text-base ${index === 0 ? "rounded-t-lg" : ""
                } ${index === responses.length - 1 ? "rounded-b-lg" : ""}`}
            >
              <span className="shrink-0 text-sm text-muted-foreground">
                {new Date(response.date).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "short",
                })}
              </span>
              <span className="min-w-0 flex-1 truncate">
                {response.question}
              </span>
              {index === 0 && <Badge>nouveau</Badge>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
