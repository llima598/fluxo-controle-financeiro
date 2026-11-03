
import Icon from './Icon'

interface HeaderProps {
  onNewTransaction: () => void
}

export default function Header({ onNewTransaction }: HeaderProps) {
  return (
    <header className="flex h-[84px] items-center justify-between max-[680px]:h-[70px]">
      <a
        className="flex items-center gap-[10px] font-['Playfair_Display',serif] text-[25px] font-bold text-[#183d30] no-underline max-[680px]:text-[22px]"
        href="#top"
        aria-label="Fluxo, início"
      >
        <span className="grid size-9 place-items-center rounded-[11px] bg-[#1d6b4e] text-white">
          <Icon name="wallet" size={19} />
        </span>
        Fluxo
      </a>

      <button
        className="inline-flex items-center justify-center gap-2 rounded-[10px] border-0 bg-[#1d6b4e] px-[17px] py-3 font-bold text-white transition-[background,transform] duration-200 hover:-translate-y-px hover:bg-[#15533b] max-[680px]:px-3 max-[680px]:py-2.5 max-[680px]:text-[13px]"
        onClick={onNewTransaction}
      >
        <Icon name="plus" size={18} />
        Nova transação
      </button>
    </header>
  )
}
