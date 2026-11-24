
import { useEffect, useMemo, useState } from 'react'
import type {
  CategoryExpense,
  DailyFinancialSummary,
  Transaction,
  TransactionForm,
} from '../types/transaction'
import { supabase } from '../lib/supabase'
import {
  calculateSummary,
  createTransactions,
  getCategoryExpenses,
  getDailyFinancialSummary,
} from '../utils/finance'

interface DatabaseTransaction {
  id: string
  user_id: string
  description: string
  category: string
  type: 'income' | 'expense'
  amount: number | string
  date: string
  installment_current: number | null
  installment_total: number | null
  installment_group_id: string | null
}

function mapDatabaseTransaction(row: DatabaseTransaction): Transaction {
  return {
    id: row.id,
    description: row.description,
    category: row.category,
    type: row.type,
    amount: Number(row.amount),
    date: row.date,
    installment:
      row.installment_current !== null &&
      row.installment_total !== null &&
      row.installment_group_id !== null
        ? {
            current: row.installment_current,
            total: row.installment_total,
            groupId: row.installment_group_id,
          }
        : null,
  }
}

export default function useTransactions(userId: string | null, selectedMonth: string) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function loadTransactions() {
      setTransactions([])
      setLoading(true)

      if (!userId) {
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false })

      if (!active) return

      if (error) {
        console.error('Erro ao carregar transações:', error.message)
        setLoading(false)
        return
      }

      setTransactions(
        (data as DatabaseTransaction[]).map(mapDatabaseTransaction),
      )
      setLoading(false)
    }

    loadTransactions()

    return () => {
      active = false
    }
  }, [userId])

  const monthTransactions = useMemo(
    () => transactions.filter(
      (transaction) => transaction.date.slice(0, 7) === selectedMonth,
    ),
    [transactions, selectedMonth],
  )

  const summary = useMemo(
    () => calculateSummary(monthTransactions),
    [monthTransactions],
  )

  const categoryExpenses = useMemo<CategoryExpense[]>(
    () => getCategoryExpenses(monthTransactions),
    [monthTransactions],
  )

  const dailySummary = useMemo<DailyFinancialSummary[]>(
    () => getDailyFinancialSummary(monthTransactions, selectedMonth),
    [monthTransactions, selectedMonth],
  )

  const filteredTransactions = useMemo(() => {
    const term = search.trim().toLowerCase()

    return monthTransactions
      .filter((transaction) => {
        const matchesFilter =
          filter === 'all' || transaction.type === filter

        const matchesSearch =
          !term ||
          transaction.description.toLowerCase().includes(term) ||
          transaction.category.toLowerCase().includes(term)

        return matchesFilter && matchesSearch
      })
      .sort((a, b) => b.date.localeCompare(a.date))
  }, [monthTransactions, filter, search])

  async function addTransaction(form: TransactionForm): Promise<void> {
    if (!userId) {
      throw new Error('Você precisa estar autenticado para cadastrar transações.')
    }

    const newTransactions = createTransactions(form)

    const rows = newTransactions.map((transaction) => ({
      id: transaction.id,
      user_id: userId,
      description: transaction.description,
      category: transaction.category,
      type: transaction.type,
      amount: transaction.amount,
      date: transaction.date,
      installment_current: transaction.installment?.current ?? null,
      installment_total: transaction.installment?.total ?? null,
      installment_group_id: transaction.installment?.groupId ?? null,
    }))

    const { data, error } = await supabase
      .from('transactions')
      .insert(rows)
      .select('*')

    if (error) throw error

    const savedTransactions = (data as DatabaseTransaction[]).map(
      mapDatabaseTransaction,
    )

    setTransactions((current) => [...savedTransactions, ...current])
  }

  async function updateTransaction(
    transactionId: string,
    form: TransactionForm,
  ): Promise<void> {
    if (!userId) {
      throw new Error('Você precisa estar autenticado para editar transações.')
    }

    const { data, error } = await supabase
      .from('transactions')
      .update({
        description: form.description.trim(),
        category: form.category,
        amount: Number(form.amount),
        date: form.date,
      })
      .eq('id', transactionId)
      .eq('user_id', userId)
      .select('*')
      .single()

    if (error) throw error

    const updatedTransaction = mapDatabaseTransaction(
      data as DatabaseTransaction,
    )

    setTransactions((current) =>
      current.map((transaction) =>
        transaction.id === transactionId
          ? updatedTransaction
          : transaction,
      ),
    )
  }

  async function removeTransaction(id: string): Promise<void> {
    if (!userId) {
      throw new Error('Você precisa estar autenticado para excluir transações.')
    }

    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id)
      .eq('user_id', userId)

    if (error) throw error

    setTransactions((current) =>
      current.filter((transaction) => transaction.id !== id),
    )
  }

  return {
    transactions: filteredTransactions,
    summary,
    dailySummary,
    categoryExpenses,
    filter,
    search,
    loading,
    setFilter,
    setSearch,
    addTransaction,
    updateTransaction,
    removeTransaction,
  }
}
