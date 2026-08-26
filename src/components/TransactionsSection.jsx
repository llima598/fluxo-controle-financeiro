import Icon from './Icon'
import TransactionList from './TransactionList'

export default function TransactionsSection({ monthLabel, filter, search, onFilterChange, onSearchChange, onAdd, transactions, currency, onRemove }) {
  return <section className="content-card"><div className="content-heading"><div><p className="eyebrow">Movimentações de {monthLabel}</p><h2>Transações recentes</h2></div><button className="text-button" onClick={onAdd}><Icon name="plus" size={17} /> Adicionar</button></div><div className="toolbar"><div className="filters">{[['all', 'Todas'], ['income', 'Entradas'], ['expense', 'Saídas']].map(([value, label]) => <button key={value} className={filter === value ? 'active' : ''} onClick={() => onFilterChange(value)}>{label}</button>)}</div><label className="search"><Icon name="search" size={18} /><input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Buscar transação" /></label></div><TransactionList transactions={transactions} currency={currency} onRemove={onRemove} /></section>
}
