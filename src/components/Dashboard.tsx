
import type { Transaction } from '../types/transaction'
import { CURRENCY } from '../utils/finance'
import MonthPicker from './MonthPicker'
import Summary from './Summary'
import FinancialChart from './FinancialChart'
import CategoryChart from './CategoryChart'
import TransactionsSection from './TransactionsSection'
import Icon from './Icon'

interface DashboardProps {
  userName: string
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
  onRemove: (id: string) => void
  onEdit: (transaction: Transaction) => void
}

export default function Dashboard({
  userName,
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
      <section
        className="flex items-start justify-between gap-6 pt-[42px] pb-[31px] max-[680px]:flex-col max-[680px]:gap-6 max-[680px]:pt-8 max-[680px]:pb-6"
        id="top"
      >
        <div className="flex flex-col items-start">
          <p className="mb-[7px] text-[11px] font-bold uppercase tracking-[0.13em] text-[#6d7a72]">
            Visão geral
          </p>

          <h1 className="mb-2 font-['Playfair_Display',Georgia,serif] text-[clamp(34px,4vw,48px)] leading-[1.08] text-[#173c2f]">
            Olá{userName ? `, ${userName}` : ''}!{' '}
            <span className="text-[#d8a23e]">✦</span>
          </h1>

          <p className="mb-0 text-[#6b756f]">
            Acompanhe suas finanças e mantenha seus objetivos no rumo certo.
          </p>

          <button
            type="button"
            onClick={onAdd}
            className="mt-5 inline-flex min-h-[46px] items-center justify-center gap-2 rounded-[11px] bg-[#1d6b4e] px-6 py-3 text-sm font-bold text-white shadow-[0_4px_12px_rgba(29,107,78,0.18)] transition hover:-translate-y-0.5 hover:bg-[#17583f] hover:shadow-[0_7px_18px_rgba(29,107,78,0.24)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1d6b4e] max-[680px]:w-full"
          >
            <Icon name="plus" size={18} />
            Nova transação
          </button>
        </div>

        <div className="shrink-0 max-[680px]:w-full">
          <MonthPicker
            selectedMonth={selectedMonth}
            monthLabel={monthLabel}
            onChangeMonth={onChangeMonth}
            onSelectMonth={onSelectMonth}
          />
        </div>
      </section>

      <Summary
        summary={summary}
        monthLabel={monthLabel}
        currency={CURRENCY}
      />

      <FinancialChart data={dailySummary} currency={CURRENCY} />

      <CategoryChart expenses={categoryExpenses} currency={CURRENCY} />

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
