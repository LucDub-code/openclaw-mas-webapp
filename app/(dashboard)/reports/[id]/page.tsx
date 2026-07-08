import Link from "next/link"
import { notFound } from "next/navigation"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { sql } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import "@/app/(dashboard)/markdown.css"

export const dynamic = "force-dynamic"

type Report = {
  id: number
  date: string
  contenu: string
}

export default async function ReportPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  if (!/^\d+$/.test(id)) notFound()

  const rows = (await sql`
    SELECT id, date, contenu
    FROM rapport.document
    WHERE id = ${id}
  `) as Report[]

  const report = rows[0]
  if (!report) notFound()

  return (
    <div className="mx-auto max-w-3xl">
      <Button
        render={<Link href="/" />}
        nativeButton={false}
        variant="outline"
        size="sm"
        className="mt-6"
      >
        <ArrowLeft />
        Retour aux rapports
      </Button>

      <article className="markdown">
        <Markdown remarkPlugins={[remarkGfm]}>{report.contenu}</Markdown>
      </article>
    </div>
  )
}
