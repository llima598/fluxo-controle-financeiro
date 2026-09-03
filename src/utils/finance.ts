import type { CategoryExpense, Summary, Transaction, TransactionForm } from '../types/transaction'

export const CURRENCY = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function dateAfterMonths(dateString: string, monthsToAdd: number): string {
  const [year, month, day] = dateString.split('-').map(Number)
  const lastDay = new Date(year, month + monthsToAdd, 0).getDate()
  const date = new Date(year, month - 1 + monthsToAdd, Math.min(day, lastDay))
  return date.toISOString().slice(0, 10)
}

export function getMonthLabel(selectedMonth: string): string {
  return new Date(`${selectedMonth}-01T12:00:00`).toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  })
}

export function calculateSummary(transactions: Transaction[]): Summary {
  return transactions.reduce<Summary>(
    (acc, transaction) => {
      if (transaction.type === 'income') acc.income += Number(transaction.amount)
      else acc.expense += Number(transaction.amount)
      return acc
    },
    { income: 0, expense: 0 },
  )
}

export function createTransactions(form: TransactionForm): Transaction[] {
  const total = Number(form.amount)
  const count = form.type === 'expense' ? Math.max(1, Number(form.installments)) : 1
  const totalInCents = Math.round(total * 100)
  const centsPerInstallment = Math.floor(totalInCents / count)
  const remainder = totalInCents % count
  const installmentGroupId = count > 1 ? `installment-${Date.now()}` : null

  return Array.from({ length: count }, (_, index) => ({
    id: Date.now() + index,
    description: form.description.trim(),
    category: form.category,
    type: form.type,
    amount: (centsPerInstallment + (index < remainder ? 1 : 0)) / 100,
    date: dateAfterMonths(form.date, index),
    installment: count > 1 && installmentGroupId
      ? { current: index + 1, total: count, groupId: installmentGroupId }
      : null,
  }))
}

export function getCategoryExpenses(transactions: Transaction[]): CategoryExpense[] {
  const totals = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce<Record<string, number>>((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + Number(transaction.amount)
      return acc
    }, {})

  return Object.entries(totals)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)
}

export function getInitialTransactions(fallback: Transaction[]): Transaction[] {
  try {
    const saved = localStorage.getItem('fluxo-transactions')
    return saved ? (JSON.parse(saved) as Transaction[]) : fallback
  } catch {
    return fallback
  }
}
