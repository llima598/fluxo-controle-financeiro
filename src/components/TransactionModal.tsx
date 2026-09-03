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

  function stopPropagation(event: MouseEvent<HTMLElement>): void {
    event.stopPropagation()
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={stopPropagation}>
        <button className="modal-close" onClick={onClose} aria-label="Fechar"><Icon name="close" size={20} /></button>
        <p className="eyebrow">{isEditing ? 'Editar registro' : 'Novo registro'}</p>
        <h2 id="modal-title">{isEditing ? 'Editar transação' : 'Adicionar transação'}</h2>
        <TransactionFormComponent selectedMonth={selectedMonth} transaction={transaction} onSubmit={onSubmit} />
      </section>
    </div>
  )
}
