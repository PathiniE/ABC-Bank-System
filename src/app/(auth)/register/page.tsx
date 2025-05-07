"use client"

import Link from "next/link"
import { RegisterForm } from "@/components/forms/register-form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-4 md:p-8">
        <Card className="mx-auto max-w-4xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
            <CardDescription>Fill in your details to create a new account</CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-sm text-muted-foreground">
              <span>Already have an account? </span>
              <Link href="/login" className="text-primary hover:underline">
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
