
import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'

interface MonthPickerProps {
  selectedMonth: string
  monthLabel: string
  onChangeMonth: (direction: number) => void
  onSelectMonth: (month: string) => void
}

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

export default function MonthPicker({
  selectedMonth,
  monthLabel,
  onChangeMonth,
  onSelectMonth,
}: MonthPickerProps) {
  const selectedYear = Number(selectedMonth.slice(0, 4))
  const selectedMonthNumber = Number(selectedMonth.slice(5, 7))

  const [isOpen, setIsOpen] = useState(false)
  const [displayYear, setDisplayYear] = useState(selectedYear)

  const pickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setDisplayYear(selectedYear)
  }, [selectedYear])

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  function selectMonth(monthIndex: number) {
    const month = String(monthIndex + 1).padStart(2, '0')

    onSelectMonth(`${displayYear}-${month}`)
    setIsOpen(false)
  }

  function togglePicker() {
    setDisplayYear(selectedYear)
    setIsOpen((previous) => !previous)
  }

  return (
    <div
      ref={pickerRef}
      className="relative min-w-[215px] max-[680px]:mt-[22px] max-[680px]:w-full"
    >
      <div className="grid grid-cols-[32px_1fr_32px] items-center gap-[5px]">
        <button
          className="grid size-8 place-items-center rounded-lg border border-[#dde6df] bg-white text-[#2e6650] transition hover:bg-[#eef5f0]"
          onClick={() => onChangeMonth(-1)}
          aria-label="Mês anterior"
          type="button"
        >
          <Icon name="left" size={18} />
        </button>

        <button
          className="flex min-h-8 items-center justify-center gap-1 rounded-lg text-[13px] font-bold capitalize text-[#66746b] transition hover:bg-[#eef5f0] hover:text-[#1d6b4e]"
          onClick={togglePicker}
          aria-expanded={isOpen}
          aria-label={`Selecionar mês. Atual: ${monthLabel}`}
          type="button"
        >
          {monthLabel}
        </button>

        <button
          className="grid size-8 place-items-center rounded-lg border border-[#dde6df] bg-white text-[#2e6650] transition hover:bg-[#eef5f0]"
          onClick={() => onChangeMonth(1)}
          aria-label="Próximo mês"
          type="button"
        >
          <Icon name="right" size={18} />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-full z-30 mt-2 w-[290px] rounded-[14px] border border-[#dce4de] bg-white p-4 shadow-[0_12px_35px_rgba(23,57,42,0.15)] max-[680px]:left-0 max-[680px]:right-auto max-[680px]:w-full">
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setDisplayYear((year) => year - 1)}
              className="grid size-8 place-items-center rounded-lg border border-[#dde6df] text-[#2e6650] transition hover:bg-[#eef5f0]"
              aria-label="Ano anterior"
            >
              <Icon name="left" size={17} />
            </button>

            <span className="text-base font-bold text-[#183d30]">
              {displayYear}
            </span>

            <button
              type="button"
              onClick={() => setDisplayYear((year) => year + 1)}
              className="grid size-8 place-items-center rounded-lg border border-[#dde6df] text-[#2e6650] transition hover:bg-[#eef5f0]"
              aria-label="Próximo ano"
            >
              <Icon name="right" size={17} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {months.map((month, index) => {
              const isSelected =
                displayYear === selectedYear &&
                index + 1 === selectedMonthNumber

              return (
                <button
                  key={month}
                  type="button"
                  onClick={() => selectMonth(index)}
                  className={`rounded-lg px-2 py-2.5 text-xs font-semibold transition ${
                    isSelected
                      ? 'bg-[#1d6b4e] text-white'
                      : 'bg-[#f4f7f4] text-[#52645a] hover:bg-[#e5eee7] hover:text-[#1d6b4e]'
                  }`}
                >
                  {month}
                </button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="mt-3 w-full rounded-lg py-2 text-xs font-semibold text-[#718077] transition hover:bg-[#f4f7f4]"
          >
            Fechar
          </button>
        </div>
      )}
    </div>
  )
}
