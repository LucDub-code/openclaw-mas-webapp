"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HomeIcon, MessageSquareIcon, BarChart3Icon, GaugeIcon } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const navItems = [
  { title: "Accueil", url: "/", icon: HomeIcon },
  { title: "Réponses", url: "/responses", icon: MessageSquareIcon },
  { title: "Suivi conso", url: "/usage", icon: BarChart3Icon },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const pathname = usePathname()

  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex-row items-center p-4">
        <span className="text-lg font-semibold">Pilotage groupe</span>
        <GaugeIcon className="size-5 text-muted-foreground" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive =
                  item.url === "/"
                    ? pathname === "/" || pathname.startsWith("/reports")
                    : pathname.startsWith(item.url)

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={isActive}
                      className="text-base"
                      render={<Link href={item.url} />}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}