import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import TransactionModal from './components/TransactionModal'
import useTransactions from './hooks/useTransactions'
import type { Transaction, TransactionForm } from './types/transaction'
import { getMonthLabel } from './utils/finance'

const initialTransactions: Transaction[] = [
  {
    id: 1,
    description: 'Salário',
    category: 'Trabalho',
    type: 'income',
    amount: 4500,
    date: '2026-08-05',
    installment: null,
  },
  {
    id: 2,
    description: 'Mercado do mês',
    category: 'Alimentação',
    type: 'expense',
    amount: 428.9,
    date: '2026-08-12',
    installment: null,
  },
  {
    id: 3,
    description: 'Freelance - Landing page',
    category: 'Trabalho',
    type: 'income',
    amount: 850,
    date: '2026-08-14',
    installment: null,
  },
  {
    id: 4,
    description: 'Plano de internet',
    category: 'Moradia',
    type: 'expense',
    amount: 119.9,
    date: '2026-08-16',
    installment: null,
  },
]

function App() {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7),
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null)
  const [notification, setNotification] = useState<string | null>(null)

  const {
    transactions,
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
  } = useTransactions(initialTransactions, selectedMonth)

  useEffect(() => {
    if (!notification) return

    const timer = setTimeout(() => setNotification(null), 3000)

    return () => clearTimeout(timer)
  }, [notification])

  const monthLabel = getMonthLabel(selectedMonth)

  function changeMonth(direction: number): void {
    const [year, month] = selectedMonth.split('-').map(Number)
    const next = new Date(year, month - 1 + direction, 1)

    setSelectedMonth(
      `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, '0')}`,
    )
  }

  function openNewTransaction(): void {
    setEditingTransaction(null)
    setIsModalOpen(true)
  }

  function openEditTransaction(transaction: Transaction): void {
    setEditingTransaction(transaction)
    setIsModalOpen(true)
  }

  function closeModal(): void {
    setIsModalOpen(false)
    setEditingTransaction(null)
  }

  function saveTransaction(form: TransactionForm): void {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, form)
      setNotification('Dados atualizados com sucesso!')
    } else {
      addTransaction(form)
      setNotification('Dados cadastrados com sucesso!')
    }

    setSelectedMonth(form.date.slice(0, 7))
    closeModal()
  }

  function handleRemove(id: number): void {
    removeTransaction(id)
    setNotification('Transação excluída com sucesso!')
  }

  return (
    <main className="app-shell">
      {notification && (
        <div className="toast-success" role="status">
          {notification}
        </div>
      )}

      <Header onNewTransaction={openNewTransaction} />

      <Dashboard
        selectedMonth={selectedMonth}
        monthLabel={monthLabel}
        transactions={transactions}
        summary={summary}
        dailySummary={dailySummary}
        categoryExpenses={categoryExpenses}
        filter={filter}
        search={search}
        onChangeMonth={changeMonth}
        onSelectMonth={setSelectedMonth}
        onFilterChange={setFilter}
        onSearchChange={setSearch}
        onAdd={openNewTransaction}
        onRemove={handleRemove}
        onEdit={openEditTransaction}
      />

      {isModalOpen && (
        <TransactionModal
          selectedMonth={selectedMonth}
          transaction={editingTransaction}
          onSubmit={saveTransaction}
          onClose={closeModal}
        />
      )}
    </main>
  )
}

export default App
