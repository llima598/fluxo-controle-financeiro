import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import MonthPicker from './components/MonthPicker'
import Summary from './components/Summary'
import TransactionsSection from './components/TransactionsSection'
import TransactionModal from './components/TransactionModal'
import useTransactions from './hooks/useTransactions'
import { CURRENCY, getMonthLabel } from './utils/finance'

const initialTransactions = [
  { id: 1, description: 'Salário', category: 'Trabalho', type: 'income', amount: 4500, date: '2026-08-05' },
  { id: 2, description: 'Mercado do mês', category: 'Alimentação', type: 'expense', amount: 428.9, date: '2026-08-12' },
  { id: 3, description: 'Freelance - Landing page', category: 'Trabalho', type: 'income', amount: 850, date: '2026-08-14' },
  { id: 4, description: 'Plano de internet', category: 'Moradia', type: 'expense', amount: 119.9, date: '2026-08-16' },
]

function App() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [notification, setNotification] = useState(null)

  const {
    transactions,
    summary,
    filter,
    search,
    setFilter,
    setSearch,
    addTransaction,
    updateTransaction,
    removeTransaction,
  } = useTransactions(initialTransactions, selectedMonth)

  useEffect(() => {
    if (!notification) return
    const timer = setTimeout(() => setNotification(null), 3000)
    return () => clearTimeout(timer)
  }, [notification])

  const monthLabel = getMonthLabel(selectedMonth)

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
      updateTransaction(editingTransaction.id, form)
      setSelectedMonth(form.date.slice(0, 7))
      setNotification('Dados atualizados com sucesso!')
    } else {
      addTransaction(form)
      setSelectedMonth(form.date.slice(0, 7))
      setNotification('Dados cadastrados com sucesso!')
    }
    closeModal()
  }

  function handleRemove(id) {
    removeTransaction(id)
    setNotification('Transação excluída com sucesso!')
  }

  return <main className="app-shell">
    {notification && <div className="toast-success" role="status">{notification}</div>}
    <Header onNewTransaction={openNewTransaction} />
    <section className="hero" id="top"><div><p className="eyebrow">Visão geral</p><h1>Olá, Lucas! <span>✦</span></h1><p className="subtitle">Acompanhe suas finanças e mantenha seus objetivos no rumo certo.</p></div><MonthPicker selectedMonth={selectedMonth} monthLabel={monthLabel} onChangeMonth={changeMonth} onSelectMonth={setSelectedMonth} /></section>
    <Summary summary={summary} monthLabel={monthLabel} currency={CURRENCY} />
    <TransactionsSection monthLabel={monthLabel} filter={filter} search={search} onFilterChange={setFilter} onSearchChange={setSearch} onAdd={openNewTransaction} transactions={transactions} currency={CURRENCY} onRemove={handleRemove} onEdit={openEditTransaction} />
    {isModalOpen && <TransactionModal selectedMonth={selectedMonth} transaction={editingTransaction} onSubmit={saveTransaction} onClose={closeModal} />}
  </main>
}

export default App
