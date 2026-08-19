# Fluxo — Controle Financeiro

Uma aplicação web responsiva para acompanhar entradas, despesas e compras parceladas. O projeto foi desenvolvido como parte do meu portfólio de front-end.

## Funcionalidades

- Cadastro e exclusão de transações
- Resumo mensal de saldo, entradas e saídas
- Navegação entre meses
- Filtro por tipo de movimentação e busca por descrição ou categoria
- Parcelamentos automáticos: uma compra em 12x gera uma despesa para cada mês
- Persistência dos dados no navegador com `localStorage`
- Layout responsivo para computador e celular

## Tecnologias

- React
- JavaScript
- Vite
- CSS puro
- Oxlint

## Como executar localmente

```bash
git clone https://github.com/llima598/fluxo-controle-financeiro.git
cd fluxo-controle-financeiro
npm install
npm run dev
```

Depois, abra o endereço exibido no terminal, normalmente `http://localhost:5173`.

## O que aprendi

Neste projeto pratiquei componentes React, gerenciamento de estado com Hooks, formulários controlados, renderização de listas, filtros, cálculos de valores financeiros, persistência local e responsividade.

## Próximos passos

- Editar transações já cadastradas
- Criar despesas recorrentes
- Adicionar gráficos por categoria
- Autenticação e banco de dados para acessar os dados em outros dispositivos

---

Feito por [Lucas Lima](https://github.com/llima598)

