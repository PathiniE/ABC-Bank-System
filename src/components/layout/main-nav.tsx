"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import { ModeToggle } from "@/components/mode-toggle" // Update this import path

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-6 md:gap-10">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">Credit Score Dashboard</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          {siteConfig.mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-muted-foreground",
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <ModeToggle />
        <div className="hidden md:flex gap-2">
          <Link href="/login">
            <span className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Login
            </span>
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link href="/register">
            <span className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Register
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
