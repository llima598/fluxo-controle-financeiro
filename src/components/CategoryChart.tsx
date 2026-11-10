import type { CategoryExpense } from '../types/transaction'

interface CategoryChartProps {
  expenses: CategoryExpense[]
  currency: Intl.NumberFormat
}

export default function CategoryChart({ expenses, currency }: CategoryChartProps) {
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0)

  return (
    <section className="mt-[18px] rounded-2xl border border-[#e1e7e2] bg-white p-[25px] max-[680px]:p-[18px]" aria-label="Gastos por categoria">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="mb-[7px] text-[11px] font-bold uppercase tracking-[0.13em] text-[#6d7a72]">Análise</p>
          <h2 className="mb-0 text-2xl font-bold tracking-[-0.03em]">Gastos por categoria</h2>
        </div>
        {expenses.length > 0 && <strong>{currency.format(totalExpenses)}</strong>}
      </div>
      {expenses.length ? (
        <div className="mt-6 grid gap-4">
          {expenses.map(({ category, amount }) => {
            const percentage = totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0
            return (
              <div className="grid gap-[7px]" key={category}>
                <div className="flex justify-between gap-4 text-[13px] text-[#59665e]">
                  <span>{category}</span>
                  <div className="flex items-center gap-2"><strong className="text-[13px] text-[#26352d]">{currency.format(amount)}</strong><small>{percentage.toFixed(1)}%</small></div>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#edf2ee]" role="progressbar" aria-label={`Gastos com ${category}`} aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}>
                  <span className="block h-full rounded-full bg-[#4b8a6d] transition-[width] duration-300" style={{ width: `${percentage}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      ) : <p className="mb-0 mt-5 text-[13px] text-[#89938d]">Nenhuma saída registrada neste mês.</p>}
    </section>
  )
}
