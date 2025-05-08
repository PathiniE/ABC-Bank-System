"use client"

import Link from "next/link"
import  {LoginForm}  from "@/components/forms/login-form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <Card className="mx-auto max-w-md w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-muted-foreground text-center">
              <span>Don&apos;t have an account? </span>
              <Link href="/register" className="text-primary hover:underline">
                Register
              </Link>
            </div>
            <div className="text-sm text-muted-foreground text-center">
              <Link href="#" className="text-primary hover:underline">
                Forgot your password?
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
