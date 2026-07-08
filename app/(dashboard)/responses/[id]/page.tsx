import Link from "next/link"
import { notFound } from "next/navigation"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { sql } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import "@/app/(dashboard)/markdown.css"

export const dynamic = "force-dynamic"

type Response = {
  id: number
  date: string
  question: string
  contenu: string
}

export default async function ResponsePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  if (!/^\d+$/.test(id)) notFound()

  const rows = (await sql`
    SELECT id, date, question, contenu
    FROM repondeur.reponse
    WHERE id = ${id}
  `) as Response[]

  const response = rows[0]
  if (!response) notFound()

  return (
    <div className="mx-auto max-w-3xl">
      <Button
        render={<Link href="/responses" />}
        nativeButton={false}
        variant="outline"
        size="sm"
      >
        <ArrowLeft />
        Retour aux réponses
      </Button>

      <h1 className="text-2xl font-semibold mt-[1.6em] mx-0 mb-[0.6em]">{response.question}</h1>

      <article className="markdown">
        <Markdown remarkPlugins={[remarkGfm]}>{response.contenu}</Markdown>
      </article>
    </div>
  )
}
