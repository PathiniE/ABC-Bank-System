"use client"
import { LoanCard } from "@/components/dashboard/loan-card"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, Plus } from "lucide-react"
import Link from "next/link"
import { Loading } from "@/components/shared/loading"
import { useLoans } from "@/hooks/use-loans"

interface LoanListProps {
  limit?: number
  showAddButton?: boolean
  filter?: "all" | "active" | "pending" | "paid"
}

export function LoanList({ limit, showAddButton = true, filter = "all" }: LoanListProps) {
  const { loans, isLoading } = useLoans()

  // Filter loans based on the filter prop
  const filteredLoans = loans.filter((loan) => {
    if (filter === "active") return loan.isLoanApproved && !loan.isLoanPaid
    if (filter === "pending") return !loan.isLoanApproved
    if (filter === "paid") return loan.isLoanPaid
    return true // "all"
  })

  const displayLoans = limit ? filteredLoans.slice(0, limit) : filteredLoans

  if (isLoading) {
    return <Loading text="Loading loans..." />
  }

  if (displayLoans.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-6">
          <p className="mb-2 text-center text-muted-foreground">No loans found</p>
          {showAddButton && (
            <Button asChild>
              <Link href="/dashboard/loans">
                <Plus className="mr-2 h-4 w-4" />
                Apply for a Loan
              </Link>
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {displayLoans.map((loan) => (
        <LoanCard key={loan.loanId} loan={loan} />
      ))}
      {showAddButton && (
        <Card className="flex flex-col items-center justify-center p-6">
          <DollarSign className="mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="mb-2 text-lg font-medium">Apply for a Loan</h3>
          <p className="mb-4 text-center text-sm text-muted-foreground">Choose from our range of loan options</p>
          <Button asChild>
            <Link href="/dashboard/loans">
              <Plus className="mr-2 h-4 w-4" />
              New Loan
            </Link>
          </Button>
        </Card>
      )}
    </div>
  )
}
