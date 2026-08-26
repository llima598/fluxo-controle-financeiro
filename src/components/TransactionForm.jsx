import { useState } from 'react'

const categories = ['Alimentação', 'Assinaturas', 'Educação', 'Lazer', 'Moradia', 'Saúde', 'Transporte', 'Trabalho', 'Outros']
const initialForm = () => ({ description: '', amount: '', type: 'expense', category: 'Alimentação', date: new Date().toISOString().slice(0, 10), installments: 1 })

export default function TransactionForm({ selectedMonth, onSubmit, onClose }) {
  const [form, setForm] = useState(() => ({ ...initialForm(), date: `${selectedMonth}-01` }))

  function handleSubmit(event) {
    event.preventDefault()
    const total = Number(form.amount)
    if (!form.description.trim() || !total) return
    onSubmit(form)
    setForm(initialForm())
  }

  return <form onSubmit={handleSubmit}><label>Descrição<input required value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Ex.: Compra de notebook" /></label><div className="form-row"><label>{form.type === 'expense' && Number(form.installments) > 1 ? 'Valor total da compra' : 'Valor'}<input required min="0.01" step="0.01" type="number" value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} placeholder="0,00" /></label><label>Tipo<select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value, installments: event.target.value === 'income' ? 1 : form.installments })}><option value="expense">Saída</option><option value="income">Entrada</option></select></label></div><div className="form-row"><label>Categoria<select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label><label>Data da 1ª parcela<input required type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} /></label></div>{form.type === 'expense' && <label>Quantidade de parcelas<input required min="1" max="120" type="number" value={form.installments} onChange={(event) => setForm({ ...form, installments: event.target.value })} /><span className="help-text">Em {form.installments || 1}x, o sistema cria uma despesa para cada mês.</span></label>}<button className="submit-button" type="submit">{form.type === 'expense' && Number(form.installments) > 1 ? `Criar ${form.installments} parcelas` : 'Salvar transação'}</button></form>
}
