export default function Icon({ name, size = 20 }) {
  const paths = {
    wallet: <><path d="M4 7.5V6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1.5" /><path d="M4 7.5h15a1 1 0 0 1 1 1v9.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8.5a2 2 0 0 1 2-2Z" /><path d="M16 13h4" /></>,
    income: <><path d="M12 19V5" /><path d="m6 11 6-6 6 6" /></>,
    expense: <><path d="M12 5v14" /><path d="m18 13-6 6-6-6" /></>,
    chart: <><path d="M4 19V5" /><path d="M4 19h16" /><path d="m7 15 4-4 3 2 5-6" /></>,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    close: <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>,
    search: <><circle cx="11" cy="11" r="6" /><path d="m20 20-4.2-4.2" /></>,
    trash: <><path d="M4 7h16" /><path d="M10 11v5" /><path d="M14 11v5" /><path d="M6 7l1 13h10l1-13" /><path d="M9 7V4h6v3" /></>,
    left: <path d="m15 18-6-6 6-6" />,
    right: <path d="m9 18 6-6-6-6" />,
  }

  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}
