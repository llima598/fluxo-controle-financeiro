import Icon from './Icon'

export default function Header({ onNewTransaction }) {
  return <header className="topbar"><a className="brand" href="#top" aria-label="Fluxo, início"><span className="brand-mark"><Icon name="wallet" size={19} /></span>Fluxo</a><button className="new-button" onClick={onNewTransaction}><Icon name="plus" size={18} /> Nova transação</button></header>
}
