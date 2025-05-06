"use client"

import { useState, useEffect } from "react"
import type { Account } from "@/lib/api"

export function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAccounts = async () => {
    setIsLoading(true)
    setError(null)
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
      setError("Failed to fetch accounts")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAccounts()
  }, [])

  const getAccount = async (id: number) => {
    try {
      // In a real app, you would fetch data from your API
      // For now, let's find the account in our mock data
      const account = accounts.find((acc) => acc.accId === id)
      return account || null
    } catch (error) {
      console.error(`Error fetching account ${id}:`, error)
      return null
    }
  }

  const createAccount = async (accountData: Partial<Account>) => {
    setIsLoading(true)
    try {
      // In a real app, you would call your API
      // For now, let's simulate creating an account
      const newAccount: Account = {
        accId: accounts.length + 1,
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
        accountType: accountData.accountType || "Savings",
        balance: 0,
        isAccountActive: true,
      }

      setAccounts([...accounts, newAccount])
      return newAccount
    } catch (error) {
      console.error("Error creating account:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    accounts,
    isLoading,
    error,
    fetchAccounts,
    getAccount,
    createAccount,
  }
}
