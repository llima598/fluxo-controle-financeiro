import { useState, type ChangeEvent, type FormEvent } from 'react'
import type { Transaction, TransactionForm as TransactionFormData } from '../types/transaction'

const categories = ['Alimentação', 'Assinaturas', 'Educação', 'Lazer', 'Moradia', 'Saúde', 'Transporte', 'Trabalho', 'Outros']

interface TransactionFormProps {
  selectedMonth: string
  transaction: Transaction | null
  onSubmit: (form: TransactionFormData) => void
}

function initialForm(selectedMonth: string): TransactionFormData {
  return { description: '', amount: '', type: 'expense', category: 'Alimentação', date: `${selectedMonth}-01`, installments: 1 }
}

const fieldClass = "w-full rounded-lg border border-[#dce4de] bg-white px-[11px] py-2.5 font-normal text-[#223129] outline-[#5c9e81]"
const labelClass = "grid gap-[7px] text-[13px] font-bold text-[#56625a]"

export default function TransactionForm({ selectedMonth, transaction, onSubmit }: TransactionFormProps) {
  const isEditing = Boolean(transaction)
  const [form, setForm] = useState<TransactionFormData>(() => transaction ? {
    description: transaction.description, amount: String(transaction.amount), type: transaction.type,
    category: transaction.category, date: transaction.date, installments: transaction.installment?.total || 1,
  } : initialForm(selectedMonth))
  const [error, setError] = useState('')

  function updateField<K extends keyof TransactionFormData>(field: K, value: TransactionFormData[K]): void {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    const total = Number(form.amount)
    if (!form.description.trim()) { setError('A descrição é obrigatória.'); return }
    if (!total || total <= 0) { setError('Informe um valor maior que zero.'); return }
    if (!form.date) { setError('Informe a data.'); return }
    const installments = Number(form.installments)
    if (!isEditing && form.type === 'expense' && (!Number.isInteger(installments) || installments < 1 || installments > 120)) {
      setError('Informe de 1 a 120 parcelas.'); return
    }
    setError('')
    onSubmit(form)
  }

  function handleTypeChange(event: ChangeEvent<HTMLSelectElement>): void {
    const type = event.target.value as TransactionFormData['type']
    setForm((current) => ({ ...current, type, installments: type === 'income' ? 1 : current.installments }))
  }

  return (
    <form className="mt-6 grid gap-[17px]" onSubmit={handleSubmit} noValidate>
      <label className={labelClass}>Descrição
        <input className={fieldClass} value={form.description} onChange={(event) => updateField('description', event.target.value)} placeholder="Ex.: Compra de notebook" />
      </label>
      <div className="grid grid-cols-2 gap-[14px]">
        <label className={labelClass}>{!isEditing && form.type === 'expense' && Number(form.installments) > 1 ? 'Valor total da compra' : 'Valor'}
          <input className={fieldClass} required min="0.01" step="0.01" type="number" value={form.amount} onChange={(event) => updateField('amount', event.target.value)} placeholder="0,00" />
        </label>
        <label className={labelClass}>Tipo
          <select className={fieldClass} value={form.type} disabled={isEditing} onChange={handleTypeChange}>
            <option value="expense">Saída</option><option value="income">Entrada</option>
          </select>
        </label>
      </div>
      <div className="grid grid-cols-2 gap-[14px]">
        <label className={labelClass}>Categoria
          <select className={fieldClass} value={form.category} onChange={(event) => updateField('category', event.target.value)}>
            {categories.map((category) => <option key={category}>{category}</option>)}
          </select>
        </label>
        <label className={labelClass}>{!isEditing && form.type === 'expense' && Number(form.installments) > 1 ? 'Data da 1ª parcela' : 'Data'}
          <input className={fieldClass} required type="date" value={form.date} onChange={(event) => updateField('date', event.target.value)} />
        </label>
      </div>
      {!isEditing && form.type === 'expense' && (
        <label className={labelClass}>Quantidade de parcelas
          <input className={fieldClass} required min="1" max="120" type="number" value={form.installments} onChange={(event) => updateField('installments', event.target.value)} />
          <span className="text-[11px] font-normal text-[#849088]">Em {form.installments || 1}x, o sistema cria uma despesa para cada mês.</span>
        </label>
      )}
      {error && <span className="mt-2 block text-sm text-red-600" role="alert">{error}</span>}
      <button className="mt-[5px] inline-flex w-full items-center justify-center gap-2 rounded-[10px] border-0 bg-[#1d6b4e] px-[17px] py-3 font-bold text-white transition hover:-translate-y-px hover:bg-[#15533b]" type="submit">
        {isEditing ? 'Salvar alterações' : form.type === 'expense' && Number(form.installments) > 1 ? `Criar ${form.installments} parcelas` : 'Salvar transação'}
      </button>
    </form>
  )
}
