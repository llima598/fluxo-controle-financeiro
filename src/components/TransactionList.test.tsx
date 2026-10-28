import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { Transaction } from '../types/transaction'
import { CURRENCY } from '../utils/finance'
import TransactionList from './TransactionList'

const salary: Transaction = {
  id: 1,
  description: 'Salário',
  category: 'Trabalho',
  type: 'income',
  amount: 4500,
  date: '2026-10-05',
  installment: null,
}

const installment: Transaction = {
  id: 2,
  description: 'Notebook',
  category: 'Educação',
  type: 'expense',
  amount: 250.5,
  date: '2026-10-10',
  installment: { current: 2, total: 6, groupId: 'installment-1' },
}

function renderList(transactions: Transaction[]) {
  const onRemove = vi.fn()
  const onEdit = vi.fn()

  render(
    <TransactionList
      transactions={transactions}
      currency={CURRENCY}
      onRemove={onRemove}
      onEdit={onEdit}
    />,
  )

  return { onRemove, onEdit, user: userEvent.setup() }
}

describe('TransactionList', () => {
  it('mostra o estado vazio quando não há transações', () => {
    renderList([])

    expect(
      screen.getByText('Nenhuma transação encontrada neste mês.'),
    ).toBeInTheDocument()
  })

  it('lista as transações com categoria e valor formatado', () => {
    renderList([salary, installment])

    expect(screen.getByText('Salário')).toBeInTheDocument()
    expect(screen.getByText(/Trabalho/)).toBeInTheDocument()
    expect(screen.getByText(/4\.500,00/)).toHaveTextContent('+')
    expect(screen.getByText(/250,50/)).toHaveTextContent('-')
  })

  it('mostra a numeração da parcela, como 2/6', () => {
    renderList([installment])

    expect(screen.getByText('2/6')).toBeInTheDocument()
  })

  it('não mostra numeração em transações sem parcelas', () => {
    renderList([salary])

    expect(screen.queryByText(/\d+\/\d+/)).not.toBeInTheDocument()
  })

  it('chama onEdit com a transação ao clicar em editar', async () => {
    const { onEdit, user } = renderList([salary, installment])

    await user.click(screen.getByRole('button', { name: 'Editar Notebook' }))

    expect(onEdit).toHaveBeenCalledTimes(1)
    expect(onEdit).toHaveBeenCalledWith(installment)
  })

  it('chama onRemove com o id ao clicar em excluir', async () => {
    const { onRemove, user } = renderList([salary, installment])

    await user.click(screen.getByRole('button', { name: 'Excluir Salário' }))

    expect(onRemove).toHaveBeenCalledTimes(1)
    expect(onRemove).toHaveBeenCalledWith(1)
  })
})
