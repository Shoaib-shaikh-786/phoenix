"use client"

import * as React from "react"
import { MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

type ActionMenuProps = {
  title?: string
  description?: string
  triggerLabel?: string
  children: React.ReactNode
  className?: string
}

export function ActionMenu({
  title = "Actions",
  description,
  triggerLabel = "Open actions",
  children,
  className,
}: ActionMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-muted-foreground"
        >
          <MenuIcon className="size-4" />
          <span className="sr-only">{triggerLabel}</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="mx-auto w-full max-w-md rounded-[1.5rem] bg-background p-0 shadow-lg"
      >
        <SheetHeader className="gap-1.5 px-6 pt-6">
          <SheetTitle>{title}</SheetTitle>
          {description ? (
            <SheetDescription>{description}</SheetDescription>
          ) : null}
        </SheetHeader>
        <div
          className={cn(
            "flex flex-col flex-wrap gap-3 px-6 pb-6 sm:flex-row sm:items-start",
            className
          )}
        >
          {children}
        </div>
        <SheetFooter className="justify-end px-6 pb-6 pt-0">
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
