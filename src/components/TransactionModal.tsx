import type { MouseEvent } from 'react'
import type { Transaction, TransactionForm } from '../types/transaction'
import Icon from './Icon'
import TransactionFormComponent from './TransactionForm'

interface TransactionModalProps {
  selectedMonth: string
  transaction: Transaction | null
  onSubmit: (form: TransactionForm) => void
  onClose: () => void
}

export default function TransactionModal({ selectedMonth, transaction, onSubmit, onClose }: TransactionModalProps) {
  const isEditing = Boolean(transaction)
  function stopPropagation(event: MouseEvent<HTMLElement>): void { event.stopPropagation() }

  return (
    <div className="fixed inset-0 z-[5] grid place-items-center bg-[rgba(11,29,21,0.46)] p-5" onMouseDown={onClose}>
      <section className="relative w-full max-w-[480px] rounded-[17px] bg-white p-[30px] shadow-[0_24px_70px_rgba(0,0,0,0.22)] max-[680px]:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={stopPropagation}>
        <button className="absolute right-[18px] top-[18px] bg-transparent p-1 text-[#718077]" onClick={onClose} aria-label="Fechar"><Icon name="close" size={20} /></button>
        <p className="mb-[7px] text-[11px] font-bold uppercase tracking-[0.13em] text-[#6d7a72]">{isEditing ? 'Editar registro' : 'Novo registro'}</p>
        <h2 className="mb-0 text-2xl font-bold tracking-[-0.03em]" id="modal-title">{isEditing ? 'Editar transação' : 'Adicionar transação'}</h2>
        <TransactionFormComponent selectedMonth={selectedMonth} transaction={transaction} onSubmit={onSubmit} />
      </section>
    </div>
  )
}
