"use client"

import { useEffect, useState } from "react"
import type { Loan } from "@/lib/api"
import { LoanCard } from "@/components/dashboard/loan-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Plus } from "lucide-react"
import { LoanForm } from "@/components/forms/loan-form"

export default function LoansPage() {
  const [loans, setLoans] = useState<Loan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showNewLoanForm, setShowNewLoanForm] = useState(false)

  useEffect(() => {
    const fetchLoans = async () => {
      setIsLoading(true)
      try {
        // In a real app, you would fetch data from your API
        // For now, let's create some mock data
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
          {
            loanId: 3,
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
            type: "Education",
            amount: 10000,
            loanTerm: 48,
            isLoanApproved: false,
            isLoanPaid: false,
          },
        ]

        setLoans(mockLoans)
      } catch (error) {
        console.error("Error fetching loans:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLoans()
  }, [])

  const handleNewLoan = () => {
    setShowNewLoanForm(true)
  }

  const approvedLoans = loans.filter((loan) => loan.isLoanApproved)
  const pendingLoans = loans.filter((loan) => !loan.isLoanApproved)
  const activeLoans = loans.filter((loan) => loan.isLoanApproved && !loan.isLoanPaid)
  const paidLoans = loans.filter((loan) => loan.isLoanPaid)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Loans</h2>
          <p className="text-muted-foreground">Manage your loans and apply for new ones</p>
        </div>
        <Button onClick={handleNewLoan}>
          <Plus className="mr-2 h-4 w-4" />
          Apply for Loan
        </Button>
      </div>

      {showNewLoanForm ? (
        <Card>
          <CardHeader>
            <CardTitle>Apply for a Loan</CardTitle>
            <CardDescription>Fill in the details to apply for a new loan</CardDescription>
          </CardHeader>
          <CardContent>
            <LoanForm onCancel={() => setShowNewLoanForm(false)} />
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Active Loans</TabsTrigger>
            <TabsTrigger value="pending">Pending Approval</TabsTrigger>
            <TabsTrigger value="paid">Paid Loans</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {activeLoans.map((loan) => (
                <LoanCard key={loan.loanId} loan={loan} />
              ))}
            </div>
            {activeLoans.length === 0 && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-6">
                  <p className="mb-2 text-center text-muted-foreground">No active loans found</p>
                  <Button onClick={handleNewLoan}>
                    <DollarSign className="mr-2 h-4 w-4" />
                    Apply for a Loan
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          <TabsContent value="pending" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pendingLoans.map((loan) => (
                <LoanCard key={loan.loanId} loan={loan} />
              ))}
            </div>
            {pendingLoans.length === 0 && (
              <Card>
                <CardContent className="py-6">
                  <p className="text-center text-muted-foreground">No pending loans found</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          <TabsContent value="paid" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {paidLoans.map((loan) => (
                <LoanCard key={loan.loanId} loan={loan} />
              ))}
            </div>
            {paidLoans.length === 0 && (
              <Card>
                <CardContent className="py-6">
                  <p className="text-center text-muted-foreground">No paid loans found</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
