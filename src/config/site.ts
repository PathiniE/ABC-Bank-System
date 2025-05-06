export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Bank Application",
  description: "Modern banking application for all your financial needs",
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
      title: "Accounts",
      href: "/dashboard/accounts",
    },
    {
      title: "Loans",
      href: "/dashboard/loans",
    },
  ],
  links: {
    twitter: "https://twitter.com/bankapp",
    github: "https://github.com/bankapp",
    docs: "https://docs.bankapp.com",
  },
}
