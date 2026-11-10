import type { Transaction } from '../types/transaction'
import Icon from './Icon'
import TransactionList from './TransactionList'

type TransactionFilter = 'all' | 'income' | 'expense'
interface TransactionsSectionProps {
  monthLabel: string
  filter: TransactionFilter
  search: string
  onFilterChange: (filter: TransactionFilter) => void
  onSearchChange: (search: string) => void
  onAdd: () => void
  transactions: Transaction[]
  currency: Intl.NumberFormat
  onRemove: (id: number) => void
  onEdit: (transaction: Transaction) => void
}

const filters: Array<[TransactionFilter, string]> = [['all', 'Todas'], ['income', 'Entradas'], ['expense', 'Saídas']]

export default function TransactionsSection({ monthLabel, filter, search, onFilterChange, onSearchChange, onAdd, transactions, currency, onRemove, onEdit }: TransactionsSectionProps) {
  return (
    <section className="mt-[30px] rounded-2xl border border-[#e1e7e2] bg-white p-[25px] max-[680px]:mt-[18px] max-[680px]:p-[18px]">
      <div className="flex items-center justify-between gap-4">
        <div><p className="mb-[7px] text-[11px] font-bold uppercase tracking-[0.13em] text-[#6d7a72]">Movimentações de {monthLabel}</p><h2 className="mb-0 text-2xl font-bold tracking-[-0.03em]">Transações recentes</h2></div>
        <button className="inline-flex items-center gap-1.5 border-0 bg-transparent text-sm font-bold text-[#1d6b4e]" onClick={onAdd}><Icon name="plus" size={17} /> Adicionar</button>
      </div>
      <div className="my-[27px] flex items-center justify-between gap-4 max-[680px]:items-stretch max-[680px]:flex-col">
        <div className="flex gap-0.5 rounded-[9px] bg-[#f0f3f1] p-1 max-[680px]:overflow-x-auto">
          {filters.map(([value, label]) => (
            <button key={value} className={`whitespace-nowrap rounded-[7px] border-0 px-3 py-[7px] text-[13px] font-semibold ${filter === value ? 'bg-white text-[#1b513d] shadow-[0_1px_3px_rgba(0,0,0,0.1)]' : 'bg-transparent text-[#6c776f]'}`} onClick={() => onFilterChange(value)}>{label}</button>
          ))}
        </div>
        <label className="flex w-[220px] items-center gap-[7px] rounded-[9px] border border-[#e0e6e1] px-2.5 py-2 text-[#718077] max-[680px]:w-full">
          <Icon name="search" size={18} />
          <input className="w-full border-0 text-[13px] text-[#27342d] outline-none placeholder:text-[#a1aaa4]" value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Buscar transação" />
        </label>
      </div>
      <TransactionList transactions={transactions} currency={currency} onRemove={onRemove} onEdit={onEdit} />
    </section>
  )
}
