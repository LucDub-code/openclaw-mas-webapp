import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"

export const dynamic = "force-dynamic"

export default function UsagePage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-semibold">Suivi conso</h1>

      <Tabs defaultValue="cycles">
        <TabsList className="w-full">
          <TabsTrigger value="cycles" className="cursor-pointer">Cycles</TabsTrigger>
          <TabsTrigger value="telegram" className="cursor-pointer">Réponses Telegram</TabsTrigger>
        </TabsList>

        <TabsContent value="cycles">
          {/* tableau des cycles ici */}
          Onglet Cycles
        </TabsContent>

        <TabsContent value="telegram">
          {/* tableau des réponses ici */}
          Onglet Réponses
        </TabsContent>
      </Tabs>
    </div>
  )
}
