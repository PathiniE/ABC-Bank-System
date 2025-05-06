"use client"

import { useState, useEffect } from "react"
import type { Loan } from "@/lib/api"

export function useLoans() {
  const [loans, setLoans] = useState<Loan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLoans = async () => {
    setIsLoading(true)
    setError(null)
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
      setError("Failed to fetch loans")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLoans()
  }, [])

  const getLoan = async (id: number) => {
    try {
      // In a real app, you would fetch data from your API
      // For now, let's find the loan in our mock data
      const loan = loans.find((loan) => loan.loanId === id)
      return loan || null
    } catch (error) {
      console.error(`Error fetching loan ${id}:`, error)
      return null
    }
  }

  const applyForLoan = async (loanData: Partial<Loan>) => {
    setIsLoading(true)
    try {
      // In a real app, you would call your API
      // For now, let's simulate applying for a loan
      const newLoan: Loan = {
        loanId: loans.length + 1,
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
        type: loanData.type || "Personal",
        amount: loanData.amount || 10000,
        loanTerm: loanData.loanTerm || 36,
        isLoanApproved: false,
        isLoanPaid: false,
      }

      setLoans([...loans, newLoan])
      return newLoan
    } catch (error) {
      console.error("Error applying for loan:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    loans,
    isLoading,
    error,
    fetchLoans,
    getLoan,
    applyForLoan,
  }
}
