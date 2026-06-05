"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import { navigationItems } from "@/lib/permission"
import { ThemeToggle } from "./theme-toggle"

const user = {
  name: "Admin",
  email: "admin@example.com",
  avatar: "/avatars/admin.jpg",
}

const teams = [
  {
    name: "Acme Corp",
    logo: null,
    plan: "Enterprise",
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navItems = navigationItems.map((item) => ({
    title: item.title,
    url: item.url,
    icon: item.icon,
    items: item.items?.map((sub) => ({
      title: sub.title,
      url: sub.url,
      items: sub.items?.map((nested) => ({
        title: nested.title,
        url: nested.url,
      })),
    })),
  }))

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <ThemeToggle />
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}