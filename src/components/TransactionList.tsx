import type { Transaction } from '../types/transaction'
import Icon from './Icon'

interface TransactionListProps {
  transactions: Transaction[]
  currency: Intl.NumberFormat
  onRemove: (id: number) => void
  onEdit: (transaction: Transaction) => void
}

export default function TransactionList({ transactions, currency, onRemove, onEdit }: TransactionListProps) {
  return (
    <div>
      {transactions.length ? transactions.map((transaction) => (
        <article className="flex min-h-[72px] items-center border-t border-[#edf0ee] max-[680px]:min-h-[70px]" key={transaction.id}>
          <span className={`mr-[13px] grid size-[38px] shrink-0 place-items-center rounded-[11px] ${transaction.type === 'income' ? 'bg-[#e7f4eb] text-[#277958]' : 'bg-[#fcedea] text-[#c55d50]'}`}>
            <Icon name={transaction.type === 'income' ? 'income' : 'expense'} size={19} />
          </span>
          <div className="grid gap-1">
            <strong className="text-sm">{transaction.description} {transaction.installment && <small className="ml-1 inline-block rounded-[5px] bg-[#eef2ef] px-[5px] py-0.5 align-middle text-[10px] text-[#6a766e]">{transaction.installment.current}/{transaction.installment.total}</small>}</strong>
            <span className="text-xs text-[#8a938e]">{transaction.category} · {new Date(`${transaction.date}T12:00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</span>
          </div>
          <strong className={`ml-auto text-sm max-[680px]:text-[13px] ${transaction.type === 'income' ? 'text-[#227957]' : 'text-[#bf594b]'}`}>
            {transaction.type === 'income' ? '+' : '-'} {currency.format(transaction.amount)}
          </strong>
          <div className="ml-[14px] flex items-center gap-1 max-[680px]:ml-1.5">
            <button className="rounded-lg bg-transparent p-1.5 text-[#a7afa9] transition hover:bg-[#eef5f0] hover:text-[#2e6650]" onClick={() => onEdit(transaction)} aria-label={`Editar ${transaction.description}`}><Icon name="edit" size={17} /></button>
            <button className="rounded-lg bg-transparent p-1.5 text-[#a7afa9] transition hover:bg-[#fcedea] hover:text-[#bf594b]" onClick={() => onRemove(transaction.id)} aria-label={`Excluir ${transaction.description}`}><Icon name="trash" size={17} /></button>
          </div>
        </article>
      )) : (
        <div className="grid place-items-center gap-2 border-t border-[#edf0ee] p-[42px] text-[#8a938e]">
          <Icon name="chart" size={32} /><p className="mb-0">Nenhuma transação encontrada neste mês.</p>
        </div>
      )}
    </div>
  )
}
