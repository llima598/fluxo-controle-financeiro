import { useState } from 'react'

const categories = ['Alimentação', 'Assinaturas', 'Educação', 'Lazer', 'Moradia', 'Saúde', 'Transporte', 'Trabalho', 'Outros']
const initialForm = () => ({ description: '', amount: '', type: 'expense', category: 'Alimentação', date: new Date().toISOString().slice(0, 10), installments: 1 })

export default function TransactionForm({ selectedMonth, transaction, onSubmit }) {
  const isEditing = Boolean(transaction)
  const [form, setForm] = useState(() => transaction ? {
    description: transaction.description,
    amount: String(transaction.amount),
    type: transaction.type,
    category: transaction.category,
    date: transaction.date,
    installments: transaction.installment?.total || 1,
  } : { ...initialForm(), date: `${selectedMonth}-01` })

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const total = Number(form.amount)
    if (!form.description.trim() || !total) return
    onSubmit({ ...form, id: transaction?.id })
  }

  return <form onSubmit={handleSubmit}>
    <label>Descrição<input required value={form.description} onChange={(event) => updateField('description', event.target.value)} placeholder="Ex.: Compra de notebook" /></label>
    <div className="form-row"><label>{form.type === 'expense' && Number(form.installments) > 1 ? 'Valor total da compra' : 'Valor'}<input required min="0.01" step="0.01" type="number" value={form.amount} onChange={(event) => updateField('amount', event.target.value)} placeholder="0,00" /></label><label>Tipo<select value={form.type} disabled={isEditing} onChange={(event) => setForm((current) => ({ ...current, type: event.target.value, installments: event.target.value === 'income' ? 1 : current.installments }))}><option value="expense">Saída</option><option value="income">Entrada</option></select></label></div>
    <div className="form-row"><label>Categoria<select value={form.category} onChange={(event) => updateField('category', event.target.value)}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label><label>Data da 1ª parcela<input required type="date" value={form.date} onChange={(event) => updateField('date', event.target.value)} /></label></div>
    {!isEditing && form.type === 'expense' && <label>Quantidade de parcelas<input required min="1" max="120" type="number" value={form.installments} onChange={(event) => updateField('installments', event.target.value)} /><span className="help-text">Em {form.installments || 1}x, o sistema cria uma despesa para cada mês.</span></label>}
    <button className="submit-button" type="submit">{isEditing ? 'Salvar alterações' : form.type === 'expense' && Number(form.installments) > 1 ? `Criar ${form.installments} parcelas` : 'Salvar transação'}</button>
  </form>
}
