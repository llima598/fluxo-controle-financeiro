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
  summary: { income: number; expense: number }
  dailySummary: { day: number; income: number; expense: number }[]
  categoryExpenses: { category: string; amount: number }[]
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
  selectedMonth, monthLabel, transactions, summary, dailySummary, categoryExpenses,
  filter, search, onChangeMonth, onSelectMonth, onFilterChange, onSearchChange,
  onAdd, onRemove, onEdit,
}: DashboardProps) {
  return (
    <>
      <section className="flex items-end justify-between py-[42px_0_31px] max-[680px]:block max-[680px]:pb-6 max-[680px]:pt-8" id="top">
        <div>
          <p className="mb-[7px] text-[11px] font-bold uppercase tracking-[0.13em] text-[#6d7a72]">Visão geral</p>
          <h1 className="mb-2 font-['Playfair_Display',Georgia,serif] text-[clamp(34px,4vw,48px)] leading-[1.08] text-[#173c2f]">Olá, Lucas! <span className="text-[#d8a23e]">✦</span></h1>
          <p className="mb-0 text-[#6b756f]">Acompanhe suas finanças e mantenha seus objetivos no rumo certo.</p>
        </div>
        <MonthPicker selectedMonth={selectedMonth} monthLabel={monthLabel} onChangeMonth={onChangeMonth} onSelectMonth={onSelectMonth} />
      </section>
      <Summary summary={summary} monthLabel={monthLabel} currency={CURRENCY} />
      <FinancialChart data={dailySummary} currency={CURRENCY} />
      <CategoryChart expenses={categoryExpenses} currency={CURRENCY} />
      <TransactionsSection
        monthLabel={monthLabel} filter={filter} search={search} onFilterChange={onFilterChange}
        onSearchChange={onSearchChange} onAdd={onAdd} transactions={transactions}
        currency={CURRENCY} onRemove={onRemove} onEdit={onEdit}
      />
    </>
  )
}
