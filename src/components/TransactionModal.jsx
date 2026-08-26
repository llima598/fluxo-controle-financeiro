import Icon from './Icon'
import TransactionForm from './TransactionForm'

export default function TransactionModal({ selectedMonth, transaction, onSubmit, onClose }) {
  const isEditing = Boolean(transaction)

  return <div className="modal-backdrop" onMouseDown={onClose}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="Fechar"><Icon name="close" size={20} /></button><p className="eyebrow">{isEditing ? 'Editar registro' : 'Novo registro'}</p><h2 id="modal-title">{isEditing ? 'Editar transação' : 'Adicionar transação'}</h2><TransactionForm selectedMonth={selectedMonth} transaction={transaction} onSubmit={onSubmit} /></section></div>
}
