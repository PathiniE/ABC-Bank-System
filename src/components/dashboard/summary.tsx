"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, DollarSign, Users, Wallet } from "lucide-react"
import { Loading } from "@/components/shared/loading"
import { useAccounts } from "@/hooks/use-accounts"
import { useLoans } from "@/hooks/use-loans"
import { useAuth } from "@/hooks/use-auth"

export function Summary() {
  const { accounts, isLoading: isLoadingAccounts } = useAccounts()
  const { loans, isLoading: isLoadingLoans } = useLoans()
  const { user } = useAuth()

  const isLoading = isLoadingAccounts || isLoadingLoans

  if (isLoading) {
    return <Loading text="Loading summary..." />
  }

  // Calculate total balance across all accounts
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)

  // Calculate total loan amount
  const totalLoanAmount = loans.reduce((sum, loan) => sum + loan.amount, 0)

  // Get active loans count
  const activeLoansCount = loans.filter((loan) => !loan.isLoanPaid).length

  return (
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
          <p className="text-xs text-muted-foreground">{activeLoansCount} active loans</p>
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
          <CardTitle className="text-sm font-medium">Accounts</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{accounts.length}</div>
          <p className="text-xs text-muted-foreground">Active accounts</p>
        </CardContent>
      </Card>
    </div>
  )
}
