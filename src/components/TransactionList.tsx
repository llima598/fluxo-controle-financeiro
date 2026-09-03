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
    <div className="transaction-list">
      {transactions.length ? transactions.map((transaction) => (
        <article className="transaction" key={transaction.id}>
          <span className={`transaction-icon ${transaction.type}`}>
            <Icon name={transaction.type === 'income' ? 'income' : 'expense'} size={19} />
          </span>
          <div className="transaction-details">
            <strong>
              {transaction.description} {transaction.installment && <small>{transaction.installment.current}/{transaction.installment.total}</small>}
            </strong>
            <span>{transaction.category} · {new Date(`${transaction.date}T12:00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</span>
          </div>
          <strong className={transaction.type === 'income' ? 'amount income' : 'amount expense'}>
            {transaction.type === 'income' ? '+' : '-'} {currency.format(transaction.amount)}
          </strong>
          <div className="transaction-actions">
            <button className="edit-button" onClick={() => onEdit(transaction)} aria-label={`Editar ${transaction.description}`}>
              <Icon name="edit" size={17} />
            </button>
            <button className="delete-button" onClick={() => onRemove(transaction.id)} aria-label={`Excluir ${transaction.description}`}>
              <Icon name="trash" size={17} />
            </button>
          </div>
        </article>
      )) : (
        <div className="empty-state">
          <Icon name="chart" size={32} />
          <p>Nenhuma transação encontrada neste mês.</p>
        </div>
      )}
    </div>
  )
}
