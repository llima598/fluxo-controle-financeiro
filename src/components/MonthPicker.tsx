import Icon from './Icon'

interface MonthPickerProps {
  selectedMonth: string
  monthLabel: string
  onChangeMonth: (direction: number) => void
  onSelectMonth: (month: string) => void
}

export default function MonthPicker({ selectedMonth, monthLabel, onChangeMonth, onSelectMonth }: MonthPickerProps) {
  return (
    <div className="relative grid min-w-[215px] grid-cols-[32px_1fr_32px] items-center gap-[5px] max-[680px]:mt-[22px]">
      <button className="relative z-20 grid size-8 place-items-center rounded-lg border border-[#dde6df] bg-white text-[#2e6650] hover:bg-[#eef5f0]" onClick={() => onChangeMonth(-1)} aria-label="Mês anterior" type="button">
        <Icon name="left" size={18} />
      </button>
      <input className="absolute inset-x-8 inset-y-0 z-10 w-auto cursor-pointer opacity-0" type="month" value={selectedMonth} onChange={(event) => onSelectMonth(event.target.value)} aria-label="Selecionar mês" />
      <button className="relative z-20 col-start-3 row-start-1 grid size-8 place-items-center rounded-lg border border-[#dde6df] bg-white text-[#2e6650] hover:bg-[#eef5f0]" onClick={() => onChangeMonth(1)} aria-label="Próximo mês" type="button">
        <Icon name="right" size={18} />
      </button>
      <p className="pointer-events-none col-span-3 row-start-2 mb-0 mt-[3px] text-center text-[13px] font-bold capitalize text-[#66746b]">{monthLabel}</p>
    </div>
  )
}
