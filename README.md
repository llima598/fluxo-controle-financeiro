# 💸 Fluxo — Controle Financeiro

Aplicação web responsiva para gerenciamento de finanças pessoais, desenvolvida com **React e TypeScript**. O projeto permite organizar receitas, despesas e compras parceladas, acompanhar movimentações financeiras e visualizar os gastos de forma intuitiva.

🔗 **[Acessar demonstração](https://fluxo-controle-financeiro-iota.vercel.app/)**

## 📸 Preview

<img width="1366" alt="Preview do Fluxo — Controle Financeiro" src="https://github.com/user-attachments/assets/3d54635d-98b4-4ca7-a268-90165fa6b10a" />

## ✨ Funcionalidades

- **Gerenciamento de transações:** cadastro, edição e exclusão de receitas e despesas.
- **Dashboard financeiro:** acompanhamento de saldo, entradas e saídas do mês.
- **Navegação mensal:** consulta e organização das movimentações por período.
- **Filtros e busca:** pesquisa por descrição, categoria e tipo de movimentação.
- **Compras parceladas:** geração automática das parcelas nos meses correspondentes.
- **Precisão nos cálculos:** tratamento de valores em centavos para evitar erros de arredondamento na divisão das parcelas.
- **Visualização financeira:** gráficos de movimentação diária e gastos por categoria.
- **Persistência de dados:** armazenamento das informações no navegador com `localStorage`.
- **Interface responsiva:** adaptação para diferentes tamanhos de tela.

## 🛠️ Tecnologias

| Tecnologia | Aplicação |
|---|---|
| React 19 | Construção da interface e componentização |
| TypeScript | Tipagem estática e segurança no desenvolvimento |
| Vite | Ambiente de desenvolvimento e build |
| Tailwind CSS v4 | Estilização e responsividade |
| Vitest | Testes automatizados |
| Testing Library | Testes de componentes e interações |
| Oxlint | Análise estática do código |
| localStorage | Persistência de dados no navegador |

## 🧠 Principais aprendizados

Durante o desenvolvimento, pratiquei conceitos importantes do ecossistema React e da construção de aplicações Front-End:

- Componentização e reutilização de código.
- Tipagem de propriedades, estados e funções com TypeScript.
- Criação de Hooks customizados para organização da lógica.
- Gerenciamento de estado com `useState`, `useEffect` e `useMemo`.
- Separação entre componentes, regras de negócio e funções utilitárias.
- Desenvolvimento de operações CRUD.
- Manipulação de formulários e validação de dados.
- Filtros, pesquisas e renderização condicional.
- Persistência de dados com `localStorage`.
- Tratamento de valores monetários em centavos.
- Cálculo e distribuição de parcelas com precisão.
- Testes automatizados de funções e componentes com Vitest e Testing Library.
- Construção de interfaces responsivas e acessíveis.

## 🧪 Testes

O projeto possui **29 casos de teste** distribuídos entre testes de regras financeiras e componentes.

Para executar os testes uma única vez:

```bash
npm run test -- --run
```

## 💻 Como executar localmente

Clone o repositório:

```bash
git clone https://github.com/llima598/fluxo-controle-financeiro.git
```

Entre na pasta do projeto:

```bash
cd fluxo-controle-financeiro
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse o endereço informado pelo Vite no terminal, normalmente `http://localhost:5173`.

### Outros comandos

```bash
npm run build       # Gera o build de produção
npm run typecheck   # Verifica a tipagem TypeScript
npm run lint        # Executa a análise estática com Oxlint
npm run test -- --run  # Executa os testes uma única vez
```

## 🔮 Próximas melhorias

- [ ] Implementar autenticação de usuários.
- [ ] Integrar uma API e banco de dados.
- [ ] Adicionar despesas recorrentes.
- [ ] Permitir gerenciamento de grupos de parcelas.

## 👨‍💻 Autor

**Lucas Lima**

- [GitHub](https://github.com/llima598)
- [LinkedIn](https://www.linkedin.com/in/lucas-lima-231248191/)

---

Projeto desenvolvido de forma independente como parte dos meus estudos em desenvolvimento Front-End, com foco em React, TypeScript, organização de código e boas práticas de desenvolvimento.
