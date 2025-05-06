// components/providers.tsx
"use client"

import { ThemeProvider } from "./theme/theme-provider"
import { AuthProvider } from "../hooks/use-auth"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  )
}