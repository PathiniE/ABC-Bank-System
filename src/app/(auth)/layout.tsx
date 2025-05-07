import type React from "react"
import { MainNav } from "@/components/layout/main-nav"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
        </div>
      </header>
      {children}
    </div>
  )
}
