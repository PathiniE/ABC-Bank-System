"use client"

import { Button } from "@/components/ui/button"

interface SuggestedQueriesProps {
  onSelectQuery: (query: string) => void
  currentSection?: string
}

export function SuggestedQueries({ onSelectQuery, currentSection }: SuggestedQueriesProps) {
  // Define default queries
  const defaultQueries = [
    "How can I improve my credit score?",
    "What factors affect my credit score?",
    "How often is my credit score updated?",
  ]

  // Section-specific queries
  const sectionQueries: Record<string, string[]> = {
    dashboard: [
      "Explain my current credit score",
      "What does my credit score mean?",
      "How does my score compare to others?",
    ],
    "credit-predictor": [
      "How accurate is the credit score prediction?",
      "What factors are used in the prediction?",
      "How can I improve my predicted score?",
    ],
    "financial-data": [
      "How do my finances affect my credit score?",
      "What debt-to-income ratio is ideal?",
      "How can I improve my financial health?",
    ],
    summary: [
      "Explain my financial summary",
      "What areas need improvement?",
      "How does my net worth affect my credit?",
    ],
  }

  // Determine which queries to show based on current section
  const queries = currentSection && sectionQueries[currentSection] 
    ? sectionQueries[currentSection] 
    : defaultQueries

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {queries.map((query) => (
        <Button 
          key={query} 
          variant="outline" 
          size="sm" 
          onClick={() => onSelectQuery(query)} 
          className="text-xs"
        >
          {query}
        </Button>
      ))}
    </div>
  )
}