import { useState, type ChangeEvent, type FormEvent } from 'react'
import type { Transaction, TransactionForm as TransactionFormData } from '../types/transaction'

const categories = ['Alimentação', 'Assinaturas', 'Educação', 'Lazer', 'Moradia', 'Saúde', 'Transporte', 'Trabalho', 'Outros']

interface TransactionFormProps {
  selectedMonth: string
  transaction: Transaction | null
  onSubmit: (form: TransactionFormData) => void
}

function initialForm(selectedMonth: string): TransactionFormData {
  return {
    description: '', amount: '', type: 'expense', category: 'Alimentação',
    date: `${selectedMonth}-01`, installments: 1,
  }
}

export default function TransactionForm({ selectedMonth, transaction, onSubmit }: TransactionFormProps) {
  const isEditing = Boolean(transaction)
  const [form, setForm] = useState<TransactionFormData>(() => transaction ? {
    description: transaction.description,
    amount: String(transaction.amount),
    type: transaction.type,
    category: transaction.category,
    date: transaction.date,
    installments: transaction.installment?.total || 1,
  } : initialForm(selectedMonth))

  function updateField<K extends keyof TransactionFormData>(field: K, value: TransactionFormData[K]): void {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    const total = Number(form.amount)
    if (!form.description.trim() || !total) return
    onSubmit(form)
  }

  function handleTypeChange(event: ChangeEvent<HTMLSelectElement>): void {
    const type = event.target.value as TransactionFormData['type']
    setForm((current) => ({ ...current, type, installments: type === 'income' ? 1 : current.installments }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Descrição<input required value={form.description} onChange={(event) => updateField('description', event.target.value)} placeholder="Ex.: Compra de notebook" /></label>
      <div className="form-row">
        <label>{form.type === 'expense' && Number(form.installments) > 1 ? 'Valor total da compra' : 'Valor'}<input required min="0.01" step="0.01" type="number" value={form.amount} onChange={(event) => updateField('amount', event.target.value)} placeholder="0,00" /></label>
        <label>Tipo<select value={form.type} disabled={isEditing} onChange={handleTypeChange}><option value="expense">Saída</option><option value="income">Entrada</option></select></label>
      </div>
      <div className="form-row">
        <label>Categoria<select value={form.category} onChange={(event) => updateField('category', event.target.value)}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
        <label>Data da 1ª parcela<input required type="date" value={form.date} onChange={(event) => updateField('date', event.target.value)} /></label>
      </div>
      {!isEditing && form.type === 'expense' && <label>Quantidade de parcelas<input required min="1" max="120" type="number" value={form.installments} onChange={(event) => updateField('installments', event.target.value)} /><span className="help-text">Em {form.installments || 1}x, o sistema cria uma despesa para cada mês.</span></label>}
      <button className="submit-button" type="submit">{isEditing ? 'Salvar alterações' : form.type === 'expense' && Number(form.installments) > 1 ? `Criar ${form.installments} parcelas` : 'Salvar transação'}</button>
    </form>
  )
}
