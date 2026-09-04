import { useEffect, useMemo, useState } from 'react'
import type { CategoryExpense, DailyFinancialSummary, Transaction, TransactionForm } from '../types/transaction'
import {
  calculateSummary,
  createTransactions,
  getCategoryExpenses,
  getDailyFinancialSummary,
  getInitialTransactions,
} from '../utils/finance'

export default function useTransactions(initialTransactions: Transaction[], selectedMonth: string) {
  const [transactions, setTransactions] = useState<Transaction[]>(() => getInitialTransactions(initialTransactions))
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    localStorage.setItem('fluxo-transactions', JSON.stringify(transactions))
  }, [transactions])

  const monthTransactions = useMemo(
    () => transactions.filter((transaction) => transaction.date.slice(0, 7) === selectedMonth),
    [transactions, selectedMonth],
  )

  const summary = useMemo(() => calculateSummary(monthTransactions), [monthTransactions])
  const categoryExpenses = useMemo<CategoryExpense[]>(() => getCategoryExpenses(monthTransactions), [monthTransactions])
  const dailySummary = useMemo<DailyFinancialSummary[]>(
    () => getDailyFinancialSummary(monthTransactions, selectedMonth),
    [monthTransactions, selectedMonth],
  )

  const filteredTransactions = useMemo(() => {
    const term = search.trim().toLowerCase()

    return monthTransactions
      .filter((transaction) => {
        const matchesFilter = filter === 'all' || transaction.type === filter
        const matchesSearch =
          !term ||
          transaction.description.toLowerCase().includes(term) ||
          transaction.category.toLowerCase().includes(term)

        return matchesFilter && matchesSearch
      })
      .sort((a, b) => b.date.localeCompare(a.date))
  }, [monthTransactions, filter, search])

  function addTransaction(form: TransactionForm): void {
    setTransactions((current) => [...createTransactions(form), ...current])
  }

  function updateTransaction(transactionId: number, form: TransactionForm): void {
    setTransactions((current) =>
      current.map((transaction) =>
        transaction.id === transactionId
          ? {
              ...transaction,
              description: form.description.trim(),
              category: form.category,
              amount: Number(form.amount),
              date: form.date,
            }
          : transaction,
      ),
    )
  }

  function removeTransaction(id: number): void {
    setTransactions((current) => current.filter((transaction) => transaction.id !== id))
  }

  return {
    transactions: filteredTransactions,
    summary,
    dailySummary,
    categoryExpenses,
    filter,
    search,
    setFilter,
    setSearch,
    addTransaction,
    updateTransaction,
    removeTransaction,
  }
}
