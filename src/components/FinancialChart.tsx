import type { DailyFinancialSummary } from '../types/transaction'

interface FinancialChartProps {
  data: DailyFinancialSummary[]
  currency: Intl.NumberFormat
}

export default function FinancialChart({ data, currency }: FinancialChartProps) {
  const maxValue = Math.max(...data.map(({ income, expense }) => Math.max(income, expense)), 1)
  const hasTransactions = data.some(({ income, expense }) => income > 0 || expense > 0)

  return (
    <section className="mt-[18px] rounded-2xl border border-[#e1e7e2] bg-white p-[25px] max-[680px]:p-[18px]" aria-label="Evolução financeira do mês">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="mb-[7px] text-[11px] font-bold uppercase tracking-[0.13em] text-[#6d7a72]">Evolução</p>
          <h2 className="mb-0 text-2xl font-bold tracking-[-0.03em]">Movimentação financeira</h2>
        </div>
        <div className="flex gap-4 text-xs font-semibold text-[#718077] max-[680px]:gap-2 max-[680px]:text-[11px]" aria-label="Legenda do gráfico">
          <span className="inline-flex items-center gap-1.5"><i className="size-2 rounded-full bg-[#4b8a6d]" /> Entradas</span>
          <span className="inline-flex items-center gap-1.5"><i className="size-2 rounded-full bg-[#c97869]" /> Saídas</span>
        </div>
      </div>
      {hasTransactions ? (
        <div className="mt-7 flex h-[220px] items-end gap-1.5 overflow-x-auto border-b border-[#e8ede9] px-1 max-[680px]:mt-[22px] max-[680px]:h-[190px]" role="img" aria-label="Gráfico diário de entradas e saídas">
          {data.map(({ day, income, expense }) => (
            <div className="flex h-full min-w-[22px] flex-[1_0_22px] flex-col items-center justify-end gap-2" key={day}>
              <div className="flex h-[175px] w-full items-end justify-center gap-0.5 max-[680px]:h-[145px]">
                <div className="w-2 rounded-t-[4px] bg-[#4b8a6d] transition-[height] duration-300 max-[680px]:w-1.5" style={{ height: `${(income / maxValue) * 100}%` }} title={`Dia ${day}: entradas ${currency.format(income)}`} />
                <div className="w-2 rounded-t-[4px] bg-[#c97869] transition-[height] duration-300 max-[680px]:w-1.5" style={{ height: `${(expense / maxValue) * 100}%` }} title={`Dia ${day}: saídas ${currency.format(expense)}`} />
              </div>
              <span className="pb-2 text-[10px] leading-none text-[#929b95]">{day}</span>
            </div>
          ))}
        </div>
      ) : <p className="mb-0 mt-7 text-[13px] text-[#89938d]">Nenhuma movimentação registrada neste mês.</p>}
    </section>
  )
}
