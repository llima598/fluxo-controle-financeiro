import { useEffect, useMemo, useState } from 'react'
import './App.css'

const initialTransactions = [
  { id: 1, description: 'Salário', category: 'Trabalho', type: 'income', amount: 4500, date: '2026-08-05' },
  { id: 2, description: 'Mercado do mês', category: 'Alimentação', type: 'expense', amount: 428.9, date: '2026-08-12' },
  { id: 3, description: 'Freelance - Landing page', category: 'Trabalho', type: 'income', amount: 850, date: '2026-08-14' },
  { id: 4, description: 'Plano de internet', category: 'Moradia', type: 'expense', amount: 119.9, date: '2026-08-16' },
]

const categories = ['Alimentação', 'Assinaturas', 'Educação', 'Lazer', 'Moradia', 'Saúde', 'Transporte', 'Trabalho', 'Outros']
const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const initialForm = () => ({ description: '', amount: '', type: 'expense', category: 'Alimentação', date: new Date().toISOString().slice(0, 10), installments: 1 })

function Icon({ name, size = 20 }) {
  const paths = {
    wallet: <><path d="M4 7.5V6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1.5" /><path d="M4 7.5h15a1 1 0 0 1 1 1v9.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8.5a2 2 0 0 1 2-2Z" /><path d="M16 13h4" /></>,
    income: <><path d="M12 19V5" /><path d="m6 11 6-6 6 6" /></>, expense: <><path d="M12 5v14" /><path d="m18 13-6 6-6-6" /></>,
    chart: <><path d="M4 19V5" /><path d="M4 19h16" /><path d="m7 15 4-4 3 2 5-6" /></>, plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    close: <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>, search: <><circle cx="11" cy="11" r="6" /><path d="m20 20-4.2-4.2" /></>,
    trash: <><path d="M4 7h16" /><path d="M10 11v5" /><path d="M14 11v5" /><path d="M6 7l1 13h10l1-13" /><path d="M9 7V4h6v3" /></>,
    left: <path d="m15 18-6-6 6-6" />, right: <path d="m9 18 6-6-6-6" />,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function dateAfterMonths(dateString, monthsToAdd) {
  const [year, month, day] = dateString.split('-').map(Number)
  const lastDay = new Date(year, month + monthsToAdd, 0).getDate()
  const date = new Date(year, month - 1 + monthsToAdd, Math.min(day, lastDay))
  return date.toISOString().slice(0, 10)
}

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('fluxo-transactions')
    return saved ? JSON.parse(saved) : initialTransactions
  })
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [form, setForm] = useState(initialForm)

  useEffect(() => localStorage.setItem('fluxo-transactions', JSON.stringify(transactions)), [transactions])

  const monthTransactions = useMemo(() => transactions.filter((transaction) => transaction.date.slice(0, 7) === selectedMonth), [transactions, selectedMonth])
  const summary = useMemo(() => monthTransactions.reduce((acc, transaction) => {
    if (transaction.type === 'income') acc.income += Number(transaction.amount)
    else acc.expense += Number(transaction.amount)
    return acc
  }, { income: 0, expense: 0 }), [monthTransactions])
  const filteredTransactions = monthTransactions.filter((transaction) => {
    const matchesFilter = filter === 'all' || transaction.type === filter
    const matchesSearch = transaction.description.toLowerCase().includes(search.toLowerCase()) || transaction.category.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  }).sort((a, b) => b.date.localeCompare(a.date))
  const monthLabel = new Date(`${selectedMonth}-01T12:00:00`).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })

  function changeMonth(direction) {
    const [year, month] = selectedMonth.split('-').map(Number)
    const next = new Date(year, month - 1 + direction, 1)
    setSelectedMonth(`${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, '0')}`)
  }

  function openModal() {
    setForm((current) => ({ ...current, date: `${selectedMonth}-01` }))
    setIsModalOpen(true)
  }

  function addTransaction(event) {
    event.preventDefault()
    const total = Number(form.amount)
    if (!form.description.trim() || !total) return
    const count = form.type === 'expense' ? Math.max(1, Number(form.installments)) : 1
    const totalInCents = Math.round(total * 100)
    const centsPerInstallment = Math.floor(totalInCents / count)
    const remainder = totalInCents % count
    const newTransactions = Array.from({ length: count }, (_, index) => ({
      id: Date.now() + index,
      description: form.description.trim(), category: form.category, type: form.type,
      amount: (centsPerInstallment + (index < remainder ? 1 : 0)) / 100,
      date: dateAfterMonths(form.date, index),
      installment: count > 1 ? { current: index + 1, total: count } : null,
    }))
    setTransactions((current) => [...newTransactions, ...current])
    setSelectedMonth(form.date.slice(0, 7))
    setForm(initialForm())
    setIsModalOpen(false)
  }

  function removeTransaction(id) { setTransactions((current) => current.filter((transaction) => transaction.id !== id)) }

  return <main className="app-shell">
    <header className="topbar"><a className="brand" href="#top" aria-label="Fluxo, início"><span className="brand-mark"><Icon name="wallet" size={19} /></span>Fluxo</a><button className="new-button" onClick={openModal}><Icon name="plus" size={18} /> Nova transação</button></header>
    <section className="hero" id="top"><div><p className="eyebrow">Visão geral</p><h1>Olá, Lucas! <span>✦</span></h1><p className="subtitle">Acompanhe suas finanças e mantenha seus objetivos no rumo certo.</p></div><div className="month-picker"><button onClick={() => changeMonth(-1)} aria-label="Mês anterior"><Icon name="left" size={18} /></button><input type="month" value={selectedMonth} onChange={(event) => setSelectedMonth(event.target.value)} aria-label="Selecionar mês" /><button onClick={() => changeMonth(1)} aria-label="Próximo mês"><Icon name="right" size={18} /></button><p>{monthLabel}</p></div></section>
    <section className="summary-grid" aria-label="Resumo financeiro"><article className="summary-card balance"><div className="card-label"><span>Saldo do mês</span><span className="icon-chip"><Icon name="wallet" size={18} /></span></div><strong>{currency.format(summary.income - summary.expense)}</strong><p>Resultado de {monthLabel}</p></article><article className="summary-card"><div className="card-label"><span>Entradas</span><span className="icon-chip positive"><Icon name="income" size={18} /></span></div><strong>{currency.format(summary.income)}</strong><p className="positive-text">↗ Valores recebidos</p></article><article className="summary-card"><div className="card-label"><span>Saídas</span><span className="icon-chip negative"><Icon name="expense" size={18} /></span></div><strong>{currency.format(summary.expense)}</strong><p className="negative-text">↘ Valores gastos</p></article></section>
    <section className="content-card"><div className="content-heading"><div><p className="eyebrow">Movimentações de {monthLabel}</p><h2>Transações recentes</h2></div><button className="text-button" onClick={openModal}><Icon name="plus" size={17} /> Adicionar</button></div><div className="toolbar"><div className="filters">{[['all', 'Todas'], ['income', 'Entradas'], ['expense', 'Saídas']].map(([value, label]) => <button key={value} className={filter === value ? 'active' : ''} onClick={() => setFilter(value)}>{label}</button>)}</div><label className="search"><Icon name="search" size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar transação" /></label></div><div className="transaction-list">{filteredTransactions.length ? filteredTransactions.map((transaction) => <article className="transaction" key={transaction.id}><span className={`transaction-icon ${transaction.type}`}><Icon name={transaction.type === 'income' ? 'income' : 'expense'} size={19} /></span><div className="transaction-details"><strong>{transaction.description} {transaction.installment && <small>{transaction.installment.current}/{transaction.installment.total}</small>}</strong><span>{transaction.category} · {new Date(`${transaction.date}T12:00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</span></div><strong className={transaction.type === 'income' ? 'amount income' : 'amount expense'}>{transaction.type === 'income' ? '+' : '-'} {currency.format(transaction.amount)}</strong><button className="delete-button" onClick={() => removeTransaction(transaction.id)} aria-label={`Excluir ${transaction.description}`}><Icon name="trash" size={17} /></button></article>) : <div className="empty-state"><Icon name="chart" size={32} /><p>Nenhuma transação encontrada neste mês.</p></div>}</div></section>
    {isModalOpen && <div className="modal-backdrop" onMouseDown={() => setIsModalOpen(false)}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setIsModalOpen(false)} aria-label="Fechar"><Icon name="close" size={20} /></button><p className="eyebrow">Novo registro</p><h2 id="modal-title">Adicionar transação</h2><form onSubmit={addTransaction}><label>Descrição<input required value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Ex.: Compra de notebook" /></label><div className="form-row"><label>{form.type === 'expense' && Number(form.installments) > 1 ? 'Valor total da compra' : 'Valor'}<input required min="0.01" step="0.01" type="number" value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} placeholder="0,00" /></label><label>Tipo<select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value, installments: event.target.value === 'income' ? 1 : form.installments })}><option value="expense">Saída</option><option value="income">Entrada</option></select></label></div><div className="form-row"><label>Categoria<select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label><label>Data da 1ª parcela<input required type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} /></label></div>{form.type === 'expense' && <label>Quantidade de parcelas<input required min="1" max="120" type="number" value={form.installments} onChange={(event) => setForm({ ...form, installments: event.target.value })} /><span className="help-text">Em {form.installments || 1}x, o sistema cria uma despesa para cada mês.</span></label>}<button className="submit-button" type="submit">{form.type === 'expense' && Number(form.installments) > 1 ? `Criar ${form.installments} parcelas` : 'Salvar transação'}</button></form></section></div>}
  </main>
}

export default App

