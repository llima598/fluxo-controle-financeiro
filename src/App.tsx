
import { useEffect, useState } from 'react'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import TransactionModal from './components/TransactionModal'
import ProfileModal from './components/ProfileModal'
import AuthForm from './components/AuthForm'
import useTransactions from './hooks/useTransactions'
import { useAuth } from './contexts/AuthContext'
import type { Transaction, TransactionForm } from './types/transaction'
import { getCurrentMonth, getMonthLabel } from './utils/finance'

function App() {
  const { user, loading: authLoading, signOut } = useAuth()

  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [notification, setNotification] = useState<string | null>(null)

  const {
    transactions,
    summary,
    dailySummary,
    categoryExpenses,
    filter,
    search,
    loading: transactionsLoading,
    setFilter,
    setSearch,
    addTransaction,
    updateTransaction,
    removeTransaction,
  } = useTransactions(user?.id ?? null, selectedMonth)

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

  async function saveTransaction(form: TransactionForm): Promise<void> {
    try {
      if (editingTransaction) {
        await updateTransaction(editingTransaction.id, form)
        setNotification('Dados atualizados com sucesso!')
      } else {
        await addTransaction(form)
        setNotification('Dados cadastrados com sucesso!')
      }

      setSelectedMonth(form.date.slice(0, 7))
      closeModal()
    } catch (error) {
      console.error('Erro ao salvar transação:', error)
      setNotification('Não foi possível salvar. Tente novamente.')
    }
  }

  async function handleRemove(id: string): Promise<void> {
    try {
      await removeTransaction(id)
      setNotification('Transação excluída com sucesso!')
    } catch (error) {
      console.error('Erro ao excluir transação:', error)
      setNotification('Não foi possível excluir a transação.')
    }
  }

  async function handleSignOut(): Promise<void> {
    try {
      await signOut()
      setNotification(null)
    } catch (error) {
      console.error('Erro ao sair:', error)
      setNotification('Não foi possível encerrar a sessão.')
    }
  }

  if (authLoading) {
    return (
      <main className="grid min-h-screen place-items-center text-[#6d7a72]">
        Carregando sua conta...
      </main>
    )
  }

  if (!user) {
    return <AuthForm />
  }

  const fullName = user.user_metadata?.full_name

  const userName =
    typeof fullName === 'string' && fullName.trim()
      ? fullName.trim().split(/\s+/)[0]
      : ''

  if (transactionsLoading) {
    return (
      <main className="grid min-h-screen place-items-center text-[#6d7a72]">
        Carregando suas transações...
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-[1180px] px-7 pb-12 max-[680px]:px-4 max-[680px]:pb-[30px]">
      {notification && (
        <div
          className="fixed right-5 top-5 z-[10] rounded-[10px] bg-[#1d6b4e] px-4 py-3 text-[13px] font-bold text-white shadow-[0_8px_24px_rgba(23,57,42,0.18)] max-[680px]:left-4 max-[680px]:right-4 max-[680px]:top-[14px] max-[680px]:text-center"
          role="status"
        >
          {notification}
        </div>
      )}

      <Header
        email={user.email ?? ''}
        onSignOut={handleSignOut}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      <Dashboard
        userName={userName}
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

      {isProfileOpen && (
        <ProfileModal
          user={user}
          onClose={() => setIsProfileOpen(false)}
        />
      )}
    </main>
  )
}

export default App
