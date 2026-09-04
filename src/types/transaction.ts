export type TransactionType = 'income' | 'expense'

export interface Installment {
  current: number
  total: number
  groupId: string
}

export interface Transaction {
  id: number
  description: string
  category: string
  type: TransactionType
  amount: number
  date: string
  installment: Installment | null
}

export interface TransactionForm {
  description: string
  category: string
  type: TransactionType
  amount: number | string
  date: string
  installments: number | string
}

export interface Summary {
  income: number
  expense: number
}

export interface CategoryExpense {
  category: string
  amount: number
}

export interface DailyFinancialSummary {
  day: number
  income: number
  expense: number
}
