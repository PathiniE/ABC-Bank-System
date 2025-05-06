"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  loanType: z.enum(["Mortgage", "Personal", "Business", "Car", "Education"]),
  amount: z.string().min(1, { message: "Loan amount is required" }),
  loanTerm: z.number().min(6).max(360),
  purpose: z.string().min(1, { message: "Loan purpose is required" }),
})

interface LoanFormProps {
  onCancel: () => void
}

export function LoanForm({ onCancel }: LoanFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loanType: "Personal",
      amount: "",
      loanTerm: 36,
      purpose: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would call your API here
      console.log(values)

      toast("Loan application submitted", {
        description: "Your loan application has been submitted for review",
      })

      onCancel() // Close the form
    } catch (error) {
      toast("Failed to submit loan application", {
        description: "There was a problem submitting your loan application",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="loanType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loan Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select loan type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Mortgage">Mortgage Loan</SelectItem>
                  <SelectItem value="Personal">Personal Loan</SelectItem>
                  <SelectItem value="Business">Business Loan</SelectItem>
                  <SelectItem value="Car">Car Loan</SelectItem>
                  <SelectItem value="Education">Education Loan</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Choose the type of loan you want to apply for</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loan Amount ($)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="10000" {...field} />
              </FormControl>
              <FormDescription>Enter the amount you wish to borrow</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="loanTerm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loan Term (Months): {field.value}</FormLabel>
              <FormControl>
                <Slider
                  min={6}
                  max={360}
                  step={6}
                  defaultValue={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                />
              </FormControl>
              <FormDescription>Select the loan term in months</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="purpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loan Purpose</FormLabel>
              <FormControl>
                <Input placeholder="Describe the purpose of this loan" {...field} />
              </FormControl>
              <FormDescription>Briefly explain why you need this loan</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-4">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}