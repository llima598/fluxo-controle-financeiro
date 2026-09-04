import { describe, expect, it } from 'vitest'
import {
  calculateSummary,
  createTransactions,
  getCategoryExpenses,
  getDailyFinancialSummary,
  dateAfterMonths,
} from './finance'

describe('calculateSummary', () => {
  it('calcula corretamente receitas e despesas', () => {
    const transactions = [
      {
        id: 1,
        description: 'Salário',
        category: 'Trabalho',
        type: 'income' as const,
        amount: 4500,
        date: '2026-08-05',
        installment: null,
      },
      {
        id: 2,
        description: 'Mercado',
        category: 'Alimentação',
        type: 'expense' as const,
        amount: 500,
        date: '2026-08-10',
        installment: null,
      },
    ]

    expect(calculateSummary(transactions)).toEqual({
      income: 4500,
      expense: 500,
    })
  })

  it('retorna zero quando não existem transações', () => {
    expect(calculateSummary([])).toEqual({
      income: 0,
      expense: 0,
    })
  })
})

describe('createTransactions', () => {
  it('cria uma transação única', () => {
    const result = createTransactions({
      description: 'Mercado',
      category: 'Alimentação',
      type: 'expense',
      amount: 100,
      date: '2026-08-10',
      installments: 1,
    })

    expect(result).toHaveLength(1)
    expect(result[0].amount).toBe(100)
    expect(result[0].installment).toBeNull()
  })

  it('divide corretamente uma compra em parcelas', () => {
    const result = createTransactions({
      description: 'Compra parcelada',
      category: 'Casa',
      type: 'expense',
      amount: 100,
      date: '2026-08-10',
      installments: 3,
    })

    expect(result).toHaveLength(3)

    expect(result.map((transaction) => transaction.amount)).toEqual([
      33.34,
      33.33,
      33.33,
    ])

    expect(
      result.reduce((total, transaction) => total + transaction.amount, 0),
    ).toBe(100)
  })

  it('cria as datas mensais corretamente', () => {
    const result = createTransactions({
      description: 'Compra parcelada',
      category: 'Casa',
      type: 'expense',
      amount: 300,
      date: '2026-08-15',
      installments: 3,
    })

    expect(result.map((transaction) => transaction.date)).toEqual([
      '2026-08-15',
      '2026-09-15',
      '2026-10-15',
    ])
  })

  it('mantém o mesmo grupo nas parcelas', () => {
    const result = createTransactions({
      description: 'Compra parcelada',
      category: 'Casa',
      type: 'expense',
      amount: 300,
      date: '2026-08-15',
      installments: 3,
    })

    const groupIds = result.map(
      (transaction) => transaction.installment?.groupId,
    )

    expect(groupIds[0]).toBeTruthy()
    expect(groupIds[0]).toBe(groupIds[1])
    expect(groupIds[1]).toBe(groupIds[2])
  })
})

describe('getCategoryExpenses', () => {
  it('agrupa despesas por categoria e ordena da maior para a menor', () => {
    const transactions = [
      {
        id: 1,
        description: 'Mercado',
        category: 'Alimentação',
        type: 'expense' as const,
        amount: 300,
        date: '2026-08-10',
        installment: null,
      },
      {
        id: 2,
        description: 'Restaurante',
        category: 'Alimentação',
        type: 'expense' as const,
        amount: 200,
        date: '2026-08-15',
        installment: null,
      },
      {
        id: 3,
        description: 'Internet',
        category: 'Moradia',
        type: 'expense' as const,
        amount: 400,
        date: '2026-08-20',
        installment: null,
      },
      {
        id: 4,
        description: 'Salário',
        category: 'Trabalho',
        type: 'income' as const,
        amount: 5000,
        date: '2026-08-05',
        installment: null,
      },
    ]

    expect(getCategoryExpenses(transactions)).toEqual([
      { category: 'Alimentação', amount: 500 },
      { category: 'Moradia', amount: 400 },
    ])
  })
})

describe('getDailyFinancialSummary', () => {
  it('organiza entradas e saídas por dia', () => {
    const transactions = [
      {
        id: 1,
        description: 'Salário',
        category: 'Trabalho',
        type: 'income' as const,
        amount: 4500,
        date: '2026-08-05',
        installment: null,
      },
      {
        id: 2,
        description: 'Mercado',
        category: 'Alimentação',
        type: 'expense' as const,
        amount: 300,
        date: '2026-08-05',
        installment: null,
      },
    ]

    const result = getDailyFinancialSummary(transactions, '2026-08')

    expect(result).toHaveLength(31)
    expect(result[4]).toEqual({ day: 5, income: 4500, expense: 300 })
    expect(result[0]).toEqual({ day: 1, income: 0, expense: 0 })
  })

  it('considera corretamente meses com 28 dias', () => {
    const result = getDailyFinancialSummary([], '2026-02')

    expect(result).toHaveLength(28)
  })
})

describe('dateAfterMonths', () => {
  it('ajusta corretamente uma data no final do mês', () => {
    expect(dateAfterMonths('2026-01-31', 1)).toBe('2026-02-28')
  })

  it('adiciona meses corretamente', () => {
    expect(dateAfterMonths('2026-08-15', 2)).toBe('2026-10-15')
  })
})
