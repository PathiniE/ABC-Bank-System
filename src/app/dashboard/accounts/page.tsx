"use client"

import { useEffect, useState } from "react"
import type { Account } from "@/lib/api"
import { AccountCard } from "@/components/dashboard/account-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Plus } from "lucide-react"
import { AccountForm } from "@/components/forms/account-form"

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showNewAccountForm, setShowNewAccountForm] = useState(false)

  useEffect(() => {
    const fetchAccounts = async () => {
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

        setAccounts(mockAccounts)
      } catch (error) {
        console.error("Error fetching accounts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAccounts()
  }, [])

  const handleNewAccount = () => {
    setShowNewAccountForm(true)
  }

  const activeAccounts = accounts.filter((account) => account.isAccountActive)
  const inactiveAccounts = accounts.filter((account) => !account.isAccountActive)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Accounts</h2>
          <p className="text-muted-foreground">Manage your bank accounts</p>
        </div>
        <Button onClick={handleNewAccount}>
          <Plus className="mr-2 h-4 w-4" />
          New Account
        </Button>
      </div>

      {showNewAccountForm ? (
        <Card>
          <CardHeader>
            <CardTitle>Open a New Account</CardTitle>
            <CardDescription>Fill in the details to open a new bank account</CardDescription>
          </CardHeader>
          <CardContent>
            <AccountForm onCancel={() => setShowNewAccountForm(false)} />
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Active Accounts</TabsTrigger>
            <TabsTrigger value="inactive">Inactive Accounts</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {activeAccounts.map((account) => (
                <AccountCard key={account.accId} account={account} />
              ))}
            </div>
            {activeAccounts.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-6">
                  <p className="mb-2 text-center text-muted-foreground">No active accounts found</p>
                  <Button onClick={handleNewAccount}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Open a New Account
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          <TabsContent value="inactive" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {inactiveAccounts.map((account) => (
                <AccountCard key={account.accId} account={account} />
              ))}
            </div>
            {inactiveAccounts.length === 0 && (
              <Card>
                <CardContent className="py-6">
                  <p className="text-center text-muted-foreground">No inactive accounts found</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
