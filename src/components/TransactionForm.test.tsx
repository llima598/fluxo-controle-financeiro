import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { Transaction } from '../types/transaction'
import TransactionForm from './TransactionForm'

const existingExpense: Transaction = {
  id: 10,
  description: 'Notebook',
  category: 'Educação',
  type: 'expense',
  amount: 500,
  date: '2026-09-15',
  installment: { current: 2, total: 6, groupId: 'installment-1' },
}

function renderNewForm() {
  const onSubmit = vi.fn()
  render(
    <TransactionForm
      selectedMonth="2026-10"
      transaction={null}
      onSubmit={onSubmit}
    />,
  )
  return { onSubmit, user: userEvent.setup() }
}

describe('TransactionForm — nova transação', () => {
  it('abre com os valores padrão do mês selecionado', () => {
    renderNewForm()

    expect(screen.getByLabelText('Descrição')).toHaveValue('')
    expect(screen.getByLabelText('Tipo')).toHaveValue('expense')
    expect(screen.getByLabelText('Data')).toHaveValue('2026-10-01')
    expect(
      screen.getByRole('button', { name: 'Salvar transação' }),
    ).toBeInTheDocument()
  })

  it('mostra erro e não envia quando a descrição está vazia', async () => {
    const { onSubmit, user } = renderNewForm()

    await user.type(screen.getByLabelText('Valor'), '50')
    await user.click(screen.getByRole('button', { name: 'Salvar transação' }))

    expect(screen.getByRole('alert')).toHaveTextContent(
      'A descrição é obrigatória.',
    )
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('mostra erro e não envia quando o valor não é maior que zero', async () => {
    const { onSubmit, user } = renderNewForm()

    await user.type(screen.getByLabelText('Descrição'), 'Mercado')
    await user.type(screen.getByLabelText('Valor'), '0')
    await user.click(screen.getByRole('button', { name: 'Salvar transação' }))

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Informe um valor maior que zero.',
    )
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('mostra erro e não envia quando a data está vazia', async () => {
    const { onSubmit, user } = renderNewForm()

    await user.type(screen.getByLabelText('Descrição'), 'Mercado')
    await user.type(screen.getByLabelText('Valor'), '80')
    fireEvent.change(screen.getByLabelText('Data'), { target: { value: '' } })
    await user.click(screen.getByRole('button', { name: 'Salvar transação' }))

    expect(screen.getByRole('alert')).toHaveTextContent('Informe a data.')
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('envia os dados preenchidos quando o formulário é válido', async () => {
    const { onSubmit, user } = renderNewForm()

    await user.type(screen.getByLabelText('Descrição'), 'Mercado')
    await user.type(screen.getByLabelText('Valor'), '150.5')
    await user.selectOptions(screen.getByLabelText('Categoria'), 'Alimentação')
    await user.click(screen.getByRole('button', { name: 'Salvar transação' }))

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        description: 'Mercado',
        amount: '150.5',
        type: 'expense',
        category: 'Alimentação',
        date: '2026-10-01',
      }),
    )
  })

  it('ajusta os rótulos e o botão quando há mais de uma parcela', async () => {
    const { user } = renderNewForm()

    const installments = screen.getByLabelText(/Quantidade de parcelas/)
    await user.clear(installments)
    await user.type(installments, '3')

    expect(screen.getByLabelText('Valor total da compra')).toBeInTheDocument()
    expect(screen.getByLabelText('Data da 1ª parcela')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Criar 3 parcelas' }),
    ).toBeInTheDocument()
  })

  it.each(['0', '121'])(
    'rejeita %s parcelas e não envia',
    async (invalidValue) => {
      const { onSubmit, user } = renderNewForm()

      await user.type(screen.getByLabelText('Descrição'), 'Geladeira')
      await user.type(screen.getByLabelText('Valor'), '3000')

      const installments = screen.getByLabelText(/Quantidade de parcelas/)
      await user.clear(installments)
      await user.type(installments, invalidValue)
      await user.click(screen.getByRole('button'))

      expect(screen.getByRole('alert')).toHaveTextContent(
        'Informe de 1 a 120 parcelas.',
      )
      expect(onSubmit).not.toHaveBeenCalled()
    },
  )

  it('esconde o campo de parcelas para entradas e volta para 1 parcela', async () => {
    const { onSubmit, user } = renderNewForm()

    const installments = screen.getByLabelText(/Quantidade de parcelas/)
    await user.clear(installments)
    await user.type(installments, '4')

    await user.selectOptions(screen.getByLabelText('Tipo'), 'income')

    expect(
      screen.queryByLabelText(/Quantidade de parcelas/),
    ).not.toBeInTheDocument()

    await user.type(screen.getByLabelText('Descrição'), 'Salário')
    await user.type(screen.getByLabelText('Valor'), '4500')
    await user.click(screen.getByRole('button', { name: 'Salvar transação' }))

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'income', installments: 1 }),
    )
  })
})

describe('TransactionForm — edição', () => {
  function renderEditForm() {
    const onSubmit = vi.fn()
    render(
      <TransactionForm
        selectedMonth="2026-10"
        transaction={existingExpense}
        onSubmit={onSubmit}
      />,
    )
    return { onSubmit, user: userEvent.setup() }
  }

  it('preenche os campos com a transação existente', () => {
    renderEditForm()

    expect(screen.getByLabelText('Descrição')).toHaveValue('Notebook')
    expect(screen.getByLabelText('Valor')).toHaveValue(500)
    expect(screen.getByLabelText('Categoria')).toHaveValue('Educação')
    expect(screen.getByLabelText('Data')).toHaveValue('2026-09-15')
  })

  it('usa rótulos de uma parcela, não da compra inteira', () => {
    renderEditForm()

    expect(screen.queryByText('Valor total da compra')).not.toBeInTheDocument()
    expect(screen.queryByText('Data da 1ª parcela')).not.toBeInTheDocument()
  })

  it('bloqueia o tipo e não mostra o campo de parcelas', () => {
    renderEditForm()

    expect(screen.getByLabelText('Tipo')).toBeDisabled()
    expect(
      screen.queryByLabelText(/Quantidade de parcelas/),
    ).not.toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Salvar alterações' }),
    ).toBeInTheDocument()
  })

  it('envia a descrição alterada', async () => {
    const { onSubmit, user } = renderEditForm()

    const description = screen.getByLabelText('Descrição')
    await user.clear(description)
    await user.type(description, 'Notebook novo')
    await user.click(screen.getByRole('button', { name: 'Salvar alterações' }))

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ description: 'Notebook novo' }),
    )
  })
})
