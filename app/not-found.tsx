import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-semibold">Page introuvable</h1>
      <p className="mt-4 text-muted-foreground">
        Ce contenu n&apos;existe pas ou a été supprimé.
      </p>
      <Button render={<Link href="/" />} nativeButton={false} className="mt-6">
        Retour aux rapports
      </Button>
    </div>
  )
}