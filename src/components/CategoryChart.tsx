import type { CategoryExpense } from '../types/transaction'

interface CategoryChartProps {
  expenses: CategoryExpense[]
  currency: Intl.NumberFormat
}

export default function CategoryChart({
  expenses,
  currency,
}: CategoryChartProps) {
  const totalExpenses = expenses.reduce((total, expense) => {
    return total + expense.amount
  }, 0)

  return (
    <section className="category-card" aria-label="Gastos por categoria">
      <div className="content-heading">
        <div>
          <p className="eyebrow">Análise</p>
          <h2>Gastos por categoria</h2>
        </div>

        {expenses.length > 0 && (
          <strong>{currency.format(totalExpenses)}</strong>
        )}
      </div>

      {expenses.length ? (
        <div className="category-list">
          {expenses.map(({ category, amount }) => {
            const percentage =
              totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0

            return (
              <div className="category-row" key={category}>
                <div className="category-label">
                  <span>{category}</span>

                  <div>
                    <strong>{currency.format(amount)}</strong>
                    <small>{percentage.toFixed(1)}%</small>
                  </div>
                </div>

                <div
                  className="category-track"
                  role="progressbar"
                  aria-label={`Gastos com ${category}`}
                  aria-valuenow={percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <span style={{ width: `${percentage}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <p className="category-empty">
          Nenhuma saída registrada neste mês.
        </p>
      )}
    </section>
  )
}
