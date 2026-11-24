
import Icon from './Icon'

interface HeaderProps {
  email: string
  onSignOut: () => void
}

export default function Header({ email, onSignOut }: HeaderProps) {
  return (
    <header className="flex min-h-[84px] items-center justify-between gap-4 max-[680px]:min-h-[70px]">
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

      <div className="flex items-center gap-4 max-[680px]:gap-2">
        <span
          className="max-w-[220px] truncate text-xs text-[#6d7a72] max-[680px]:hidden"
          title={email}
        >
          {email}
        </span>

        <button
          className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#dce4de] bg-white px-3 py-2.5 text-[13px] font-bold text-[#52645a] transition hover:bg-[#f0f5f1]"
          onClick={onSignOut}
          type="button"
        >
          <Icon name="log-out" size={17} />
          Sair
        </button>
      </div>
    </header>
  )
}
