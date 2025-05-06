import type React from "react"
import { DashboardNav } from "@/components/layout/dashboard-nav"
import { UserNav } from "@/components/layout/user-nav"
import { ThemeToggle } from "@/components/theme/theme-toggle"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 dark:bg-gray-900">
      <DashboardNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-3 md:px-6 py-2 md:py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white truncate">
              Credit Score Dashboard
            </h1>
            <div className="flex items-center">
              <ThemeToggle />
              <div className="ml-2">
                <UserNav />
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-3 md:p-6">{children}</main>
      </div>
    </div>
  )
}
