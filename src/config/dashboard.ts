import { CreditCard, Home, ScrollText, User } from "lucide-react"

export const dashboardConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Support",
      href: "/support",
    },
  ],
  sidebarNav: [
    {
      title: "Overview",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Accounts",
      href: "/dashboard/accounts",
      icon: CreditCard,
    },
    {
      title: "Loans",
      href: "/dashboard/loans",
      icon: ScrollText,
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
  ],
}
