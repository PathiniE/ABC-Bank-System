"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AccountCard } from "@/components/dashboard/account-card"
import { LoanCard } from "@/components/dashboard/loan-card"
import type { Account, Loan } from "@/lib/api"
import { ArrowUpRight, CreditCard, DollarSign, Users, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardPage() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loans, setLoans] = useState<Loan[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // In a real app, you would fetch data from your API
        // For now, let's create some mock data
        const mockAccounts: Account[] = [
          {
            accId: 1,
            user: {
              nic: "123456789V",
              fname: "John",
              lname: "Doe",
              email: "john@example.com",
              telNo: "1234567890",
              noOfDependents: 2,
              graduated: true,
              selfEmployed: false,
              annualIncome: 75000,
              creditScore: 720,
              assets: 250000,
            },
            accountType: "Savings",
            balance: 12500,
            isAccountActive: true,
          },
          {
            accId: 2,
            user: {
              nic: "123456789V",
              fname: "John",
              lname: "Doe",
              email: "john@example.com",
              telNo: "1234567890",
              noOfDependents: 2,
              graduated: true,
              selfEmployed: false,
              annualIncome: 75000,
              creditScore: 720,
              assets: 250000,
            },
            accountType: "Current",
            balance: 5200,
            isAccountActive: true,
          },
        ]

        const mockLoans: Loan[] = [
          {
            loanId: 1,
            user: {
              nic: "123456789V",
              fname: "John",
              lname: "Doe",
              email: "john@example.com",
              telNo: "1234567890",
              noOfDependents: 2,
              graduated: true,
              selfEmployed: false,
              annualIncome: 75000,
              creditScore: 720,
              assets: 250000,
            },
            type: "Personal",
            amount: 15000,
            loanTerm: 36,
            isLoanApproved: true,
            isLoanPaid: false,
          },
          {
            loanId: 2,
            user: {
              nic: "123456789V",
              fname: "John",
              lname: "Doe",
              email: "john@example.com",
              telNo: "1234567890",
              noOfDependents: 2,
              graduated: true,
              selfEmployed: false,
              annualIncome: 75000,
              creditScore: 720,
              assets: 250000,
            },
            type: "Car",
            amount: 25000,
            loanTerm: 60,
            isLoanApproved: true,
            isLoanPaid: false,
          },
        ]

        setAccounts(mockAccounts)
        setLoans(mockLoans)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Calculate total balance across all accounts
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)

  // Calculate total loan amount
  const totalLoanAmount = loans.reduce((sum, loan) => sum + loan.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, John Doe</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/dashboard/accounts">
              <CreditCard className="mr-2 h-4 w-4" />
              New Account
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard/loans">
              <DollarSign className="mr-2 h-4 w-4" />
              Apply for Loan
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBalance.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all accounts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalLoanAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {loans.filter((loan) => !loan.isLoanPaid).length} active loans
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credit Score</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">720</div>
            <p className="text-xs text-muted-foreground">Good credit rating</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dependents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Registered dependents</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="accounts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="loans">Loans</TabsTrigger>
        </TabsList>
        <TabsContent value="accounts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {accounts.map((account) => (
              <AccountCard key={account.accId} account={account} />
            ))}
          </div>
          {accounts.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <p className="mb-2 text-center text-muted-foreground">No accounts found</p>
                <Button asChild>
                  <Link href="/dashboard/accounts">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Open a New Account
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="loans" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {loans.map((loan) => (
              <LoanCard key={loan.loanId} loan={loan} />
            ))}
          </div>
          {loans.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <p className="mb-2 text-center text-muted-foreground">No loans found</p>
                <Button asChild>
                  <Link href="/dashboard/loans">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Apply for a Loan
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
