import type { Summary as SummaryData } from '../types/transaction'
import Icon from './Icon'

interface SummaryProps {
  summary: SummaryData
  monthLabel: string
  currency: Intl.NumberFormat
}

export default function Summary({ summary, monthLabel, currency }: SummaryProps) {
  return (
    <section className="grid grid-cols-3 gap-[18px] max-[680px]:grid-cols-1 max-[680px]:gap-3" aria-label="Resumo financeiro">
      <article className="rounded-2xl border border-[#e1e7e2] bg-gradient-to-br from-[#1b6249] to-[#245f48] p-[22px] text-white shadow-[0_6px_24px_rgba(23,57,42,0.035)] max-[680px]:p-[18px]">
        <div className="flex items-center justify-between text-sm font-semibold text-[#d5e5dc]"><span>Saldo do mês</span><span className="grid size-[34px] place-items-center rounded-[10px] bg-white/15 text-white"><Icon name="wallet" size={18} /></span></div>
        <strong className="my-5 mb-1.5 block text-[27px] tracking-[-0.04em] max-[680px]:mt-3">{currency.format(summary.income - summary.expense)}</strong>
        <p className="mb-0 text-[13px] text-[#c3d9cf]">Resultado de {monthLabel}</p>
      </article>
      <article className="rounded-2xl border border-[#e1e7e2] bg-white p-[22px] shadow-[0_6px_24px_rgba(23,57,42,0.035)] max-[680px]:p-[18px]">
        <div className="flex items-center justify-between text-sm font-semibold text-[#69756e]"><span>Entradas</span><span className="grid size-[34px] place-items-center rounded-[10px] bg-[#e5f4eb] text-[#197251]"><Icon name="income" size={18} /></span></div>
        <strong className="my-5 mb-1.5 block text-[27px] tracking-[-0.04em] max-[680px]:mt-3">{currency.format(summary.income)}</strong>
        <p className="mb-0 text-[13px] text-[#27815e]">↗ Valores recebidos</p>
      </article>
      <article className="rounded-2xl border border-[#e1e7e2] bg-white p-[22px] shadow-[0_6px_24px_rgba(23,57,42,0.035)] max-[680px]:p-[18px]">
        <div className="flex items-center justify-between text-sm font-semibold text-[#69756e]"><span>Saídas</span><span className="grid size-[34px] place-items-center rounded-[10px] bg-[#fbeae6] text-[#c25a49]"><Icon name="expense" size={18} /></span></div>
        <strong className="my-5 mb-1.5 block text-[27px] tracking-[-0.04em] max-[680px]:mt-3">{currency.format(summary.expense)}</strong>
        <p className="mb-0 text-[13px] text-[#c56455]">↘ Valores gastos</p>
      </article>
    </section>
  )
}
