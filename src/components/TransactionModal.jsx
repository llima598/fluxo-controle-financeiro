import Icon from './Icon'
import TransactionForm from './TransactionForm'

export default function TransactionModal({ selectedMonth, onSubmit, onClose }) {
  return <div className="modal-backdrop" onMouseDown={onClose}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="Fechar"><Icon name="close" size={20} /></button><p className="eyebrow">Novo registro</p><h2 id="modal-title">Adicionar transação</h2><TransactionForm selectedMonth={selectedMonth} onSubmit={onSubmit} onClose={onClose} /></section></div>
}
