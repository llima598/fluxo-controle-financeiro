import type { CategoryExpense } from '../types/transaction'

interface CategoryChartProps {
  expenses: CategoryExpense[]
  currency: Intl.NumberFormat
}

export default function CategoryChart({ expenses, currency }: CategoryChartProps) {
  const maxAmount = expenses[0]?.amount || 1

  return (
    <section className="category-card" aria-label="Gastos por categoria">
      <div className="content-heading">
        <div>
          <p className="eyebrow">Análise</p>
          <h2>Gastos por categoria</h2>
        </div>
      </div>

      {expenses.length ? (
        <div className="category-list">
          {expenses.map(({ category, amount }) => (
            <div className="category-row" key={category}>
              <div className="category-label">
                <span>{category}</span>
                <strong>{currency.format(amount)}</strong>
              </div>
              <div className="category-track" aria-hidden="true">
                <span style={{ width: `${(amount / maxAmount) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="category-empty">Nenhuma saída registrada neste mês.</p>
      )}
    </section>
  )
}
