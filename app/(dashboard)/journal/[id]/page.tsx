import Link from "next/link"
import { notFound } from "next/navigation"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { sql } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import "@/app/(dashboard)/markdown.css"

export const dynamic = "force-dynamic"

type Entree = {
  id: number
  date: string
  contenu: string
}

export default async function EntreePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  if (!/^\d+$/.test(id)) notFound()

  const rows = (await sql`
    SELECT id, date, contenu
    FROM journal.entree
    WHERE id = ${id}
  `) as Entree[]

  const entree = rows[0]
  if (!entree) notFound()

  return (
    <div className="mx-auto max-w-3xl">
      <Button
        render={<Link href="/journal" />}
        nativeButton={false}
        variant="outline"
        size="sm"
      >
        <ArrowLeft />
        Retour au journal
      </Button>

      <article className="markdown">
        <Markdown remarkPlugins={[remarkGfm]}>{entree.contenu}</Markdown>
      </article>
    </div>
  )
}
