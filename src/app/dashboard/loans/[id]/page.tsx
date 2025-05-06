"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import type { Loan } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Calendar, Clock, DollarSign, FileCheck, FileClock, Loader2 } from "lucide-react"
import Link from "next/link"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"

// Mock payment data
interface Payment {
  id: string
  date: string
  amount: number
  status: "paid" | "pending" | "overdue"
}

export default function LoanDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [loan, setLoan] = useState<Loan | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [payments, setPayments] = useState<Payment[]>([])

  useEffect(() => {
    const fetchLoan = async () => {
      setIsLoading(true)
      try {
        // In a real app, you would fetch data from your API
        // For now, let's create some mock data
        const mockLoan: Loan = {
          loanId: Number(params.id),
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
          type:
            Number(params.id) % 5 === 0
              ? "Mortgage"
              : Number(params.id) % 4 === 0
                ? "Business"
                : Number(params.id) % 3 === 0
                  ? "Car"
                  : Number(params.id) % 2 === 0
                    ? "Education"
                    : "Personal",
          amount: 15000,
          loanTerm: 36,
          isLoanApproved: true,
          isLoanPaid: false,
        }

        // Mock payments
        const mockPayments: Payment[] = [
          {
            id: "pay1",
            date: "2023-01-15",
            amount: 450,
            status: "paid",
          },
          {
            id: "pay2",
            date: "2023-02-15",
            amount: 450,
            status: "paid",
          },
          {
            id: "pay3",
            date: "2023-03-15",
            amount: 450,
            status: "paid",
          },
          {
            id: "pay4",
            date: "2023-04-15",
            amount: 450,
            status: "pending",
          },
          {
            id: "pay5",
            date: "2023-05-15",
            amount: 450,
            status: "pending",
          },
        ]

        setLoan(mockLoan)
        setPayments(mockPayments)
      } catch (error) {
        console.error("Error fetching loan:", error)
        toast.error("Failed to load loan details")
      } finally {
        setIsLoading(false)
      }
    }

    fetchLoan()
  }, [params.id])

  const handleMakePayment = () => {
    toast.success("Payment Successful", {
      description: "Your payment has been processed"
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!loan) {
    return (
      <div className="space-y-4">
        <Button asChild variant="outline">
          <Link href="/dashboard/loans">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Loans
          </Link>
        </Button>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <p className="text-center text-muted-foreground">Loan not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Calculate loan details
  const interestRate =
    loan.type === "Mortgage"
      ? 4.5
      : loan.type === "Business"
        ? 6.5
        : loan.type === "Car"
          ? 5.5
          : loan.type === "Education"
            ? 4.0
            : 7.5

  const monthlyPayment =
    (loan.amount * (interestRate / 100 / 12) * Math.pow(1 + interestRate / 100 / 12, loan.loanTerm)) /
    (Math.pow(1 + interestRate / 100 / 12, loan.loanTerm) - 1)

  const totalPayment = monthlyPayment * loan.loanTerm
  const totalInterest = totalPayment - loan.amount

  // Calculate progress
  const paidPayments = payments.filter((payment) => payment.status === "paid")
  const paidAmount = paidPayments.reduce((sum, payment) => sum + payment.amount, 0)
  const progressPercentage = (paidAmount / loan.amount) * 100

  return (
    <div className="space-y-6">
      <Button asChild variant="outline">
        <Link href="/dashboard/loans">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Loans
        </Link>
      </Button>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{loan.type} Loan</CardTitle>
                <CardDescription>Loan #{loan.loanId}</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Badge variant={loan.isLoanApproved ? "default" : "outline"}>
                  {loan.isLoanApproved ? "Approved" : "Pending"}
                </Badge>
                <Badge variant={loan.isLoanPaid ? "success" : "secondary"}>{loan.isLoanPaid ? "Paid" : "Active"}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Loan Amount</h3>
                <p className="text-3xl font-bold">${loan.amount.toLocaleString()}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Interest Rate</h3>
                  <p>{interestRate.toFixed(2)}%</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Loan Term</h3>
                  <p>{loan.loanTerm} months</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Monthly Payment</h3>
                  <p>${monthlyPayment.toFixed(2)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Total Interest</h3>
                  <p>${totalInterest.toFixed(2)}</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Repayment Progress</h3>
                <Progress value={progressPercentage} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  ${paidAmount.toFixed(2)} of ${loan.amount.toFixed(2)} ({progressPercentage.toFixed(1)}%)
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleMakePayment}>
              <DollarSign className="mr-2 h-4 w-4" />
              Make Payment
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Loan Summary</CardTitle>
            <CardDescription>Overview of your loan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-3">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <h3 className="text-sm font-medium text-muted-foreground">Start Date</h3>
                  </div>
                  <p className="text-lg font-medium mt-1">January 15, 2023</p>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <h3 className="text-sm font-medium text-muted-foreground">End Date</h3>
                  </div>
                  <p className="text-lg font-medium mt-1">January 15, 2026</p>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <h3 className="text-sm font-medium text-muted-foreground">Next Payment</h3>
                </div>
                <p className="text-lg font-medium mt-1">May 15, 2023</p>
                <p className="text-sm text-muted-foreground">Amount: ${monthlyPayment.toFixed(2)}</p>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                  <h3 className="text-sm font-medium text-muted-foreground">Total Repayment</h3>
                </div>
                <p className="text-lg font-medium mt-1">${totalPayment.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">
                  Principal: ${loan.amount.toFixed(2)}, Interest: ${totalInterest.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>Recent payments for this loan</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of your loan payments</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>${payment.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        payment.status === "paid" ? "default" : payment.status === "pending" ? "outline" : "destructive"
                      }
                    >
                      {payment.status === "paid" ? (
                        <span className="flex items-center">
                          <FileCheck className="mr-1 h-3 w-3" />
                          Paid
                        </span>
                      ) : payment.status === "pending" ? (
                        <span className="flex items-center">
                          <FileClock className="mr-1 h-3 w-3" />
                          Pending
                        </span>
                      ) : (
                        "Overdue"
                      )}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}