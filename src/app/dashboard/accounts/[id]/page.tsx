// "use client"

// import { useEffect, useState } from "react"
// import { useParams, useRouter } from "next/navigation"
// import type { Account } from "@/lib/api"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { ArrowLeft, Download, Loader2, Upload } from "lucide-react"
// import Link from "next/link"
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { toast } from "sonner"

// // Mock transaction data
// interface Transaction {
//   id: string
//   date: string
//   description: string
//   amount: number
//   type: "credit" | "debit"
// }

// export default function AccountDetailPage() {
//   const params = useParams()
//   const router = useRouter()
//   const { toast } = useToast()
//   const [account, setAccount] = useState<Account | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [transactions, setTransactions] = useState<Transaction[]>([])

//   useEffect(() => {
//     const fetchAccount = async () => {
//       setIsLoading(true)
//       try {
//         // In a real app, you would fetch data from your API
//         // For now, let's create some mock data
//         const mockAccount: Account = {
//           accId: Number(params.id),
//           user: {
//             nic: "123456789V",
//             fname: "John",
//             lname: "Doe",
//             email: "john@example.com",
//             telNo: "1234567890",
//             noOfDependents: 2,
//             graduated: true,
//             selfEmployed: false,
//             annualIncome: 75000,
//             creditScore: 720,
//             assets: 250000,
//           },
//           accountType: Number(params.id) % 2 === 0 ? "Current" : "Savings",
//           balance: 12500,
//           isAccountActive: true,
//         }

//         // Mock transactions
//         const mockTransactions: Transaction[] = [
//           {
//             id: "tx1",
//             date: "2023-05-01",
//             description: "Salary Deposit",
//             amount: 5000,
//             type: "credit",
//           },
//           {
//             id: "tx2",
//             date: "2023-05-05",
//             description: "Grocery Shopping",
//             amount: 150,
//             type: "debit",
//           },
//           {
//             id: "tx3",
//             date: "2023-05-10",
//             description: "Online Purchase",
//             amount: 75.99,
//             type: "debit",
//           },
//           {
//             id: "tx4",
//             date: "2023-05-15",
//             description: "Utility Bill",
//             amount: 120,
//             type: "debit",
//           },
//           {
//             id: "tx5",
//             date: "2023-05-20",
//             description: "Transfer from Savings",
//             amount: 500,
//             type: "credit",
//           },
//         ]

//         setAccount(mockAccount)
//         setTransactions(mockTransactions)
//       } catch (error) {
//         console.error("Error fetching account:", error)
//         toast({
//           variant: "destructive",
//           title: "Error",
//           description: "Failed to load account details",
//         })
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchAccount()
//   }, [params.id, toast])

//   const handleDeposit = () => {
//     toast({
//       title: "Deposit Successful",
//       description: "Your deposit has been processed",
//     })
//   }

//   const handleWithdraw = () => {
//     toast({
//       title: "Withdrawal Successful",
//       description: "Your withdrawal has been processed",
//     })
//   }

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-[50vh]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     )
//   }

//   if (!account) {
//     return (
//       <div className="space-y-4">
//         <Button asChild variant="outline">
//           <Link href="/dashboard/accounts">
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to Accounts
//           </Link>
//         </Button>
//         <Card>
//           <CardContent className="flex flex-col items-center justify-center py-10">
//             <p className="text-center text-muted-foreground">Account not found</p>
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       <Button asChild variant="outline">
//         <Link href="/dashboard/accounts">
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Back to Accounts
//         </Link>
//       </Button>

//       <div className="grid gap-6 md:grid-cols-2">
//         <Card>
//           <CardHeader>
//             <div className="flex items-center justify-between">
//               <div>
//                 <CardTitle>{account.accountType} Account</CardTitle>
//                 <CardDescription>Account #{account.accId}</CardDescription>
//               </div>
//               <Badge variant={account.isAccountActive ? "default" : "destructive"}>
//                 {account.isAccountActive ? "Active" : "Inactive"}
//               </Badge>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div>
//                 <h3 className="text-sm font-medium text-muted-foreground">Current Balance</h3>
//                 <p className="text-3xl font-bold">${account.balance.toLocaleString()}</p>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <h3 className="text-sm font-medium text-muted-foreground">Account Holder</h3>
//                   <p>
//                     {account.user.fname} {account.user.lname}
//                   </p>
//                 </div>
//                 <div>
//                   <h3 className="text-sm font-medium text-muted-foreground">Account Type</h3>
//                   <p>{account.accountType}</p>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//           <CardFooter className="flex justify-between">
//             <Button onClick={handleDeposit}>
//               <Upload className="mr-2 h-4 w-4" />
//               Deposit
//             </Button>
//             <Button variant="outline" onClick={handleWithdraw}>
//               <Download className="mr-2 h-4 w-4" />
//               Withdraw
//             </Button>
//           </CardFooter>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Account Summary</CardTitle>
//             <CardDescription>Overview of your account activity</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="rounded-lg border p-3">
//                   <h3 className="text-sm font-medium text-muted-foreground">Total Deposits</h3>
//                   <p className="text-2xl font-bold text-green-600">
//                     $
//                     {transactions
//                       .filter((tx) => tx.type === "credit")
//                       .reduce((sum, tx) => sum + tx.amount, 0)
//                       .toLocaleString()}
//                   </p>
//                 </div>
//                 <div className="rounded-lg border p-3">
//                   <h3 className="text-sm font-medium text-muted-foreground">Total Withdrawals</h3>
//                   <p className="text-2xl font-bold text-red-600">
//                     $
//                     {transactions
//                       .filter((tx) => tx.type === "debit")
//                       .reduce((sum, tx) => sum + tx.amount, 0)
//                       .toLocaleString()}
//                   </p>
//                 </div>
//               </div>
//               <div className="rounded-lg border p-3">
//                 <h3 className="text-sm font-medium text-muted-foreground">Recent Activity</h3>
//                 <p className="text-sm">Last transaction: {transactions[0]?.date}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Transaction History</CardTitle>
//           <CardDescription>Recent transactions for this account</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableCaption>A list of your recent transactions</TableCaption>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Description</TableHead>
//                 <TableHead>Type</TableHead>
//                 <TableHead className="text-right">Amount</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {transactions.map((transaction) => (
//                 <TableRow key={transaction.id}>
//                   <TableCell>{transaction.date}</TableCell>
//                   <TableCell>{transaction.description}</TableCell>
//                   <TableCell>
//                     <Badge variant={transaction.type === "credit" ? "outline" : "secondary"}>
//                       {transaction.type === "credit" ? "Deposit" : "Withdrawal"}
//                     </Badge>
//                   </TableCell>
//                   <TableCell
//                     className={`text-right ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}
//                   >
//                     {transaction.type === "credit" ? "+" : "-"}${transaction.amount.toLocaleString()}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }



"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import type { Account } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Loader2, Upload } from "lucide-react"
import Link from "next/link"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"

// Mock transaction data
interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  type: "credit" | "debit"
}

export default function AccountDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [account, setAccount] = useState<Account | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    const fetchAccount = async () => {
      setIsLoading(true)
      try {
        // In a real app, you would fetch data from your API
        // For now, let's create some mock data
        const mockAccount: Account = {
          accId: Number(params.id),
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
          accountType: Number(params.id) % 2 === 0 ? "Current" : "Savings",
          balance: 12500,
          isAccountActive: true,
        }

        // Mock transactions
        const mockTransactions: Transaction[] = [
          {
            id: "tx1",
            date: "2023-05-01",
            description: "Salary Deposit",
            amount: 5000,
            type: "credit",
          },
          {
            id: "tx2",
            date: "2023-05-05",
            description: "Grocery Shopping",
            amount: 150,
            type: "debit",
          },
          {
            id: "tx3",
            date: "2023-05-10",
            description: "Online Purchase",
            amount: 75.99,
            type: "debit",
          },
          {
            id: "tx4",
            date: "2023-05-15",
            description: "Utility Bill",
            amount: 120,
            type: "debit",
          },
          {
            id: "tx5",
            date: "2023-05-20",
            description: "Transfer from Savings",
            amount: 500,
            type: "credit",
          },
        ]

        setAccount(mockAccount)
        setTransactions(mockTransactions)
      } catch (error) {
        console.error("Error fetching account:", error)
        toast("Error", {
          description: "Failed to load account details",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchAccount()
  }, [params.id])

  const handleDeposit = () => {
    toast("Deposit Successful", {
      description: "Your deposit has been processed",
    })
  }

  const handleWithdraw = () => {
    toast("Withdrawal Successful", {
      description: "Your withdrawal has been processed",
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!account) {
    return (
      <div className="space-y-4">
        <Button asChild variant="outline">
          <Link href="/dashboard/accounts">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Accounts
          </Link>
        </Button>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <p className="text-center text-muted-foreground">Account not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Button asChild variant="outline">
        <Link href="/dashboard/accounts">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Accounts
        </Link>
      </Button>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{account.accountType} Account</CardTitle>
                <CardDescription>Account #{account.accId}</CardDescription>
              </div>
              <Badge variant={account.isAccountActive ? "default" : "destructive"}>
                {account.isAccountActive ? "Active" : "Inactive"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Current Balance</h3>
                <p className="text-3xl font-bold">${account.balance.toLocaleString()}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Account Holder</h3>
                  <p>
                    {account.user.fname} {account.user.lname}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Account Type</h3>
                  <p>{account.accountType}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={handleDeposit}>
              <Upload className="mr-2 h-4 w-4" />
              Deposit
            </Button>
            <Button variant="outline" onClick={handleWithdraw}>
              <Download className="mr-2 h-4 w-4" />
              Withdraw
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Summary</CardTitle>
            <CardDescription>Overview of your account activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-3">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Deposits</h3>
                  <p className="text-2xl font-bold text-green-600">
                    $
                    {transactions
                      .filter((tx) => tx.type === "credit")
                      .reduce((sum, tx) => sum + tx.amount, 0)
                      .toLocaleString()}
                  </p>
                </div>
                <div className="rounded-lg border p-3">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Withdrawals</h3>
                  <p className="text-2xl font-bold text-red-600">
                    $
                    {transactions
                      .filter((tx) => tx.type === "debit")
                      .reduce((sum, tx) => sum + tx.amount, 0)
                      .toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <h3 className="text-sm font-medium text-muted-foreground">Recent Activity</h3>
                <p className="text-sm">Last transaction: {transactions[0]?.date}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Recent transactions for this account</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of your recent transactions</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <Badge variant={transaction.type === "credit" ? "outline" : "secondary"}>
                      {transaction.type === "credit" ? "Deposit" : "Withdrawal"}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className={`text-right ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}
                  >
                    {transaction.type === "credit" ? "+" : "-"}${transaction.amount.toLocaleString()}
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