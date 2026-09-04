import type { DailyFinancialSummary } from '../types/transaction'

interface FinancialChartProps {
  data: DailyFinancialSummary[]
  currency: Intl.NumberFormat
}

export default function FinancialChart({ data, currency }: FinancialChartProps) {
  const maxValue = Math.max(
    ...data.map(({ income, expense }) => Math.max(income, expense)),
    1,
  )

  const hasTransactions = data.some(({ income, expense }) => income > 0 || expense > 0)

  return (
    <section className="financial-chart-card" aria-label="Evolução financeira do mês">
      <div className="content-heading">
        <div>
          <p className="eyebrow">Evolução</p>
          <h2>Movimentação financeira</h2>
        </div>
        <div className="chart-legend" aria-label="Legenda do gráfico">
          <span><i className="legend-dot income-dot" /> Entradas</span>
          <span><i className="legend-dot expense-dot" /> Saídas</span>
        </div>
      </div>

      {hasTransactions ? (
        <div className="financial-chart" role="img" aria-label="Gráfico diário de entradas e saídas">
          {data.map(({ day, income, expense }) => (
            <div className="chart-column" key={day}>
              <div className="chart-bars">
                <div
                  className="chart-bar income-bar"
                  style={{ height: `${(income / maxValue) * 100}%` }}
                  title={`Dia ${day}: entradas ${currency.format(income)}`}
                />
                <div
                  className="chart-bar expense-bar"
                  style={{ height: `${(expense / maxValue) * 100}%` }}
                  title={`Dia ${day}: saídas ${currency.format(expense)}`}
                />
              </div>
              <span>{day}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="chart-empty">Nenhuma movimentação registrada neste mês.</p>
      )}
    </section>
  )
}
