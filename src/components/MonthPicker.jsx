import Icon from './Icon'

export default function MonthPicker({ selectedMonth, monthLabel, onChangeMonth, onSelectMonth }) {
  return <div className="month-picker"><button onClick={() => onChangeMonth(-1)} aria-label="Mês anterior"><Icon name="left" size={18} /></button><input type="month" value={selectedMonth} onChange={(event) => onSelectMonth(event.target.value)} aria-label="Selecionar mês" /><button onClick={() => onChangeMonth(1)} aria-label="Próximo mês"><Icon name="right" size={18} /></button><p>{monthLabel}</p></div>
}
