import { useEffect, useMemo, useState } from 'react'
import './App.css'
import Header from './components/Header'
import MonthPicker from './components/MonthPicker'
import Summary from './components/Summary'
import TransactionsSection from './components/TransactionsSection'
import TransactionModal from './components/TransactionModal'

const initialTransactions = [
  { id: 1, description: 'Salário', category: 'Trabalho', type: 'income', amount: 4500, date: '2026-08-05' },
  { id: 2, description: 'Mercado do mês', category: 'Alimentação', type: 'expense', amount: 428.9, date: '2026-08-12' },
  { id: 3, description: 'Freelance - Landing page', category: 'Trabalho', type: 'income', amount: 850, date: '2026-08-14' },
  { id: 4, description: 'Plano de internet', category: 'Moradia', type: 'expense', amount: 119.9, date: '2026-08-16' },
]

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

function dateAfterMonths(dateString, monthsToAdd) {
  const [year, month, day] = dateString.split('-').map(Number)
  const lastDay = new Date(year, month + monthsToAdd, 0).getDate()
  const date = new Date(year, month - 1 + monthsToAdd, Math.min(day, lastDay))
  return date.toISOString().slice(0, 10)
}

function getInitialTransactions() {
  try {
    const saved = localStorage.getItem('fluxo-transactions')
    return saved ? JSON.parse(saved) : initialTransactions
  } catch {
    return initialTransactions
  }
}

function App() {
  const [transactions, setTransactions] = useState(getInitialTransactions)
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    localStorage.setItem('fluxo-transactions', JSON.stringify(transactions))
  }, [transactions])

  const monthTransactions = useMemo(() => transactions.filter((transaction) => transaction.date.slice(0, 7) === selectedMonth), [transactions, selectedMonth])

  const summary = useMemo(() => monthTransactions.reduce((acc, transaction) => {
    if (transaction.type === 'income') acc.income += Number(transaction.amount)
    else acc.expense += Number(transaction.amount)
    return acc
  }, { income: 0, expense: 0 }), [monthTransactions])

  const filteredTransactions = useMemo(() => monthTransactions.filter((transaction) => {
    const matchesFilter = filter === 'all' || transaction.type === filter
    const term = search.toLowerCase()
    const matchesSearch = transaction.description.toLowerCase().includes(term) || transaction.category.toLowerCase().includes(term)
    return matchesFilter && matchesSearch
  }).sort((a, b) => b.date.localeCompare(a.date)), [monthTransactions, filter, search])

  const monthLabel = new Date(`${selectedMonth}-01T12:00:00`).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })

  function changeMonth(direction) {
    const [year, month] = selectedMonth.split('-').map(Number)
    const next = new Date(year, month - 1 + direction, 1)
    setSelectedMonth(`${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, '0')}`)
  }

  function openNewTransaction() {
    setEditingTransaction(null)
    setIsModalOpen(true)
  }

  function openEditTransaction(transaction) {
    setEditingTransaction(transaction)
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
    setEditingTransaction(null)
  }

  function saveTransaction(form) {
    if (editingTransaction) {
      setTransactions((current) => current.map((transaction) => transaction.id === editingTransaction.id ? {
        ...transaction,
        description: form.description.trim(),
        category: form.category,
        amount: Number(form.amount),
        date: form.date,
      } : transaction))
      setSelectedMonth(form.date.slice(0, 7))
      closeModal()
      return
    }

    const total = Number(form.amount)
    const count = form.type === 'expense' ? Math.max(1, Number(form.installments)) : 1
    const totalInCents = Math.round(total * 100)
    const centsPerInstallment = Math.floor(totalInCents / count)
    const remainder = totalInCents % count
    const newTransactions = Array.from({ length: count }, (_, index) => ({
      id: Date.now() + index,
      description: form.description.trim(),
      category: form.category,
      type: form.type,
      amount: (centsPerInstallment + (index < remainder ? 1 : 0)) / 100,
      date: dateAfterMonths(form.date, index),
      installment: count > 1 ? { current: index + 1, total: count } : null,
    }))

    setTransactions((current) => [...newTransactions, ...current])
    setSelectedMonth(form.date.slice(0, 7))
    closeModal()
  }

  function removeTransaction(id) {
    setTransactions((current) => current.filter((transaction) => transaction.id !== id))
  }

  return <main className="app-shell">
    <Header onNewTransaction={openNewTransaction} />
    <section className="hero" id="top"><div><p className="eyebrow">Visão geral</p><h1>Olá, Lucas! <span>✦</span></h1><p className="subtitle">Acompanhe suas finanças e mantenha seus objetivos no rumo certo.</p></div><MonthPicker selectedMonth={selectedMonth} monthLabel={monthLabel} onChangeMonth={changeMonth} onSelectMonth={setSelectedMonth} /></section>
    <Summary summary={summary} monthLabel={monthLabel} currency={currency} />
    <TransactionsSection monthLabel={monthLabel} filter={filter} search={search} onFilterChange={setFilter} onSearchChange={setSearch} onAdd={openNewTransaction} transactions={filteredTransactions} currency={currency} onRemove={removeTransaction} onEdit={openEditTransaction} />
    {isModalOpen && <TransactionModal selectedMonth={selectedMonth} transaction={editingTransaction} onSubmit={saveTransaction} onClose={closeModal} />}
  </main>
}

export default App
