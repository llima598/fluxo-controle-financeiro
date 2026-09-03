import { useEffect, useMemo, useState } from 'react'
import { calculateSummary, createTransactions, getInitialTransactions } from '../utils/finance'

export default function useTransactions(initialTransactions, selectedMonth) {
  const [transactions, setTransactions] = useState(() => getInitialTransactions(initialTransactions))
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    localStorage.setItem('fluxo-transactions', JSON.stringify(transactions))
  }, [transactions])

  const monthTransactions = useMemo(
    () => transactions.filter((transaction) => transaction.date.slice(0, 7) === selectedMonth),
    [transactions, selectedMonth],
  )

  const summary = useMemo(() => calculateSummary(monthTransactions), [monthTransactions])

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

  function addTransaction(form) {
    setTransactions((current) => [...createTransactions(form), ...current])
  }

  function updateTransaction(transactionId, form) {
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

  function removeTransaction(id) {
    setTransactions((current) => current.filter((transaction) => transaction.id !== id))
  }

  function removeInstallmentGroup(groupId) {
    setTransactions((current) =>
      current.filter((transaction) => transaction.installment?.groupId !== groupId),
    )
  }

  return {
    transactions: filteredTransactions,
    summary,
    filter,
    search,
    setFilter,
    setSearch,
    addTransaction,
    updateTransaction,
    removeTransaction,
    removeInstallmentGroup,
  }
}
