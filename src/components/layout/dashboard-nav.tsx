"use client"

import Link from "next/link"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { dashboardConfig } from "@/config/dashboard"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
// Update import path
import { useAuth } from "@/app/auth-provider"

export function DashboardNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout, user } = useAuth()

  const handleLogout = () => {
    try {
      logout()
    } catch (error) {
      console.error("Error logging out:", error)
      // Fallback in case the logout function fails
      router.push("/login")
    }
  }

  return (
    <aside className="bg-gray-200 dark:bg-gray-800 w-full md:w-64 min-h-[60px] md:min-h-screen p-4 overflow-x-auto md:overflow-x-hidden">
      <nav className="flex md:flex-col space-x-3 md:space-x-0 md:space-y-2">
        {dashboardConfig.sidebarNav.map((item) => (
          <Link key={item.href} href={item.href} className="flex-shrink-0 md:flex-shrink">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start px-2 md:px-3",
                pathname === item.href && "bg-accent text-accent-foreground",
              )}
            >
              <item.icon className="h-5 w-5 md:mr-2 md:h-4 md:w-4" />
              <span className="hidden md:inline">{item.title}</span>
            </Button>
          </Link>
        ))}

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" className="w-full justify-start px-2 md:px-3 mt-auto">
              <LogOut className="h-5 w-5 md:mr-2 md:h-4 md:w-4" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
              <AlertDialogDescription>You will be redirected to the login page.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </nav>
    </aside>
  )
}
