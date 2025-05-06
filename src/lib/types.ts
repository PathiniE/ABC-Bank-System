// Additional types for the application
export interface ApiResponse<T> {
    data?: T
    error?: string
    success: boolean
  }
  
  export interface Transaction {
    id: string
    date: string
    description: string
    amount: number
    type: "credit" | "debit"
  }
  
  export interface Payment {
    id: string
    date: string
    amount: number
    status: "paid" | "pending" | "overdue"
  }
  