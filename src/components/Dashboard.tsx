import type { Transaction } from '../types/transaction'
import { CURRENCY } from '../utils/finance'
import MonthPicker from './MonthPicker'
import Summary from './Summary'
import FinancialChart from './FinancialChart'
import CategoryChart from './CategoryChart'
import TransactionsSection from './TransactionsSection'

interface DashboardProps {
  selectedMonth: string
  monthLabel: string
  transactions: Transaction[]
  summary: {
    income: number
    expense: number
  }
  dailySummary: {
    day: number
    income: number
    expense: number
  }[]
  categoryExpenses: {
    category: string
    amount: number
  }[]
  filter: 'all' | 'income' | 'expense'
  search: string
  onChangeMonth: (direction: number) => void
  onSelectMonth: (month: string) => void
  onFilterChange: (filter: 'all' | 'income' | 'expense') => void
  onSearchChange: (search: string) => void
  onAdd: () => void
  onRemove: (id: number) => void
  onEdit: (transaction: Transaction) => void
}

export default function Dashboard({
  selectedMonth,
  monthLabel,
  transactions,
  summary,
  dailySummary,
  categoryExpenses,
  filter,
  search,
  onChangeMonth,
  onSelectMonth,
  onFilterChange,
  onSearchChange,
  onAdd,
  onRemove,
  onEdit,
}: DashboardProps) {
  return (
    <>
      <section className="hero" id="top">
        <div>
          <p className="eyebrow">Visão geral</p>
          <h1>
            Olá, Lucas! <span>✦</span>
          </h1>
          <p className="subtitle">
            Acompanhe suas finanças e mantenha seus objetivos no rumo certo.
          </p>
        </div>

        <MonthPicker
          selectedMonth={selectedMonth}
          monthLabel={monthLabel}
          onChangeMonth={onChangeMonth}
          onSelectMonth={onSelectMonth}
        />
      </section>

      <Summary
        summary={summary}
        monthLabel={monthLabel}
        currency={CURRENCY}
      />

      <FinancialChart
        data={dailySummary}
        currency={CURRENCY}
      />

      <CategoryChart
        expenses={categoryExpenses}
        currency={CURRENCY}
      />

      <TransactionsSection
        monthLabel={monthLabel}
        filter={filter}
        search={search}
        onFilterChange={onFilterChange}
        onSearchChange={onSearchChange}
        onAdd={onAdd}
        transactions={transactions}
        currency={CURRENCY}
        onRemove={onRemove}
        onEdit={onEdit}
      />
    </>
  )
}