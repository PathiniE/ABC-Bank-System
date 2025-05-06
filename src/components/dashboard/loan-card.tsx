import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type { Loan } from "@/lib/api"

interface LoanCardProps {
  loan: Loan
}

export function LoanCard({ loan }: LoanCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">{loan.type} Loan</CardTitle>
        <div className="flex space-x-2">
          <Badge variant={loan.isLoanApproved ? "default" : "outline"}>
            {loan.isLoanApproved ? "Approved" : "Pending"}
          </Badge>
          <Badge variant={loan.isLoanPaid ? "success" : "secondary"}>{loan.isLoanPaid ? "Paid" : "Active"}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${loan.amount.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground">Term: {loan.loanTerm} months</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/dashboard/loans/${loan.loanId}`}>
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
