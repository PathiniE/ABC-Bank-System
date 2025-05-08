"use client"

import Link from "next/link"
import { MainNav } from "@/components/layout/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, CreditCard, Lock, Smartphone, Wallet } from "lucide-react"
import Image from "next/image"
import { ChatBot } from "@/components/chat/chat-bot" // Import the ChatBot component
import { ChatProvider } from "@/components/chat/chat-provider" // Import the ChatProvider

export default function Home() {
  return (
    <ChatProvider> {/* Wrap your entire application in the ChatProvider */}
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="container flex h-16 items-center justify-between py-4">
            <MainNav />
          </div>
        </header>
        <main className="flex-1">
          {/* Hero Section */}
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                      Banking Made Simple
                    </h1>
                    <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                      Manage your finances with ease. Our digital banking platform provides secure, convenient access to
                      your accounts anytime, anywhere.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Link href="/register" passHref>
                      <Button size="lg">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/login" passHref>
                      <Button variant="outline" size="lg">
                        Login
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative h-[350px] w-[350px] md:h-[450px] md:w-[450px]">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 blur-3xl"></div>
                    <div className="relative h-full w-full bg-muted/50 rounded-lg border border-border shadow-lg flex items-center justify-center">
                      <div className="p-8">
                        <Image
                          src="/bank-image.jpeg"
                          alt="Banking App"
                          width={100}
                          height={100}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    Features That Make Banking Better
                  </h2>
                  <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Our platform is designed with you in mind, offering tools and services to help you manage your money
                    effectively.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
                <Card className="flex flex-col items-center text-center">
                  <CardHeader>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <Smartphone className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>Mobile Banking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>Access your accounts anytime, anywhere with our mobile app.</CardDescription>
                  </CardContent>
                </Card>
                <Card className="flex flex-col items-center text-center">
                  <CardHeader>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <Lock className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>Secure Transactions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>Bank with confidence knowing your data is protected.</CardDescription>
                  </CardContent>
                </Card>
                <Card className="flex flex-col items-center text-center">
                  <CardHeader>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <CreditCard className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>Multiple Accounts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>Manage savings, checking, and more from one dashboard.</CardDescription>
                  </CardContent>
                </Card>
                <Card className="flex flex-col items-center text-center">
                  <CardHeader>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <Wallet className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>Loan Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>Apply for loans and track your payments easily.</CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to Get Started?</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Join thousands of customers who trust us with their banking needs.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register" passHref>
                    <Button size="lg">Open an Account</Button>
                  </Link>
                  <Link href="/login" passHref>
                    <Button variant="outline" size="lg">
                      Login to Your Account
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="border-t bg-background">
          <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8 md:py-12">
            <div className="flex-1 space-y-4">
              <div className="text-lg font-medium">Bank App</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Modern banking for modern life.</p>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4">
              <div className="space-y-3">
                <div className="text-sm font-medium">Products</div>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                      Accounts
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                      Loans
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                      Credit Cards
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <div className="text-sm font-medium">Company</div>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <div className="text-sm font-medium">Resources</div>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                      Support
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <div className="text-sm font-medium">Legal</div>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                      Terms
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                      Cookies
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t py-6">
            <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} Bank App. All rights reserved.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                  <span className="sr-only">Twitter</span>
                </a>
                <a href="#" className="text-gray-500 hover:text-primary dark:text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                  <span className="sr-only">Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </footer>

        {/* Add the ChatBot component here, outside of the main content flow but inside the provider */}
        <ChatBot />
      </div>
    </ChatProvider>
  )
}