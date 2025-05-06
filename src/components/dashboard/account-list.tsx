"use client"
import { AccountCard } from "@/components/dashboard/account-card"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Plus } from "lucide-react"
import Link from "next/link"
import { Loading } from "@/components/shared/loading"
import { useAccounts } from "@/hooks/use-accounts"

interface AccountListProps {
  limit?: number
  showAddButton?: boolean
}

export function AccountList({ limit, showAddButton = true }: AccountListProps) {
  const { accounts, isLoading } = useAccounts()
  const displayAccounts = limit ? accounts.slice(0, limit) : accounts

  if (isLoading) {
    return <Loading text="Loading accounts..." />
  }

  if (displayAccounts.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-6">
          <p className="mb-2 text-center text-muted-foreground">No accounts found</p>
          {showAddButton && (
            <Button asChild>
              <Link href="/dashboard/accounts">
                <Plus className="mr-2 h-4 w-4" />
                Open a New Account
              </Link>
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {displayAccounts.map((account) => (
        <AccountCard key={account.accId} account={account} />
      ))}
      {showAddButton && (
        <Card className="flex flex-col items-center justify-center p-6">
          <CreditCard className="mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="mb-2 text-lg font-medium">Open a New Account</h3>
          <p className="mb-4 text-center text-sm text-muted-foreground">
            Choose from our range of savings and current accounts
          </p>
          <Button asChild>
            <Link href="/dashboard/accounts">
              <Plus className="mr-2 h-4 w-4" />
              New Account
            </Link>
          </Button>
        </Card>
      )}
    </div>
  )
}
