export interface User {
    nic: string
    fname: string
    lname: string
    email: string
    telNo: string
    noOfDependents: number
    graduated: boolean
    selfEmployed: boolean
    annualIncome: number
    creditScore: number
    assets: number
  }
  
  export interface Account {
    accId: number
    user: User
    accountType: string
    balance: number
    isAccountActive: boolean
  }
  
  export interface Loan {
    loanId: number
    user: User
    type: string
    amount: number
    loanTerm: number
    isLoanApproved: boolean
    isLoanPaid: boolean
  }
  