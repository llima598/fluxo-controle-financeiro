# 💸 Fluxo — Controle Financeiro

Aplicação web responsiva para gerenciamento de finanças pessoais, desenvolvida com **React e TypeScript**. O projeto permite organizar receitas, despesas e compras parceladas, acompanhar movimentações financeiras e visualizar os gastos por meio de um dashboard intuitivo.

🔗 **[Acessar demonstração](https://fluxo-controle-financeiro-iota.vercel.app/)**

## 📸 Preview

<img width="1366" alt="Preview do Fluxo — Controle Financeiro" src="https://github.com/user-attachments/assets/3d54635d-98b4-4ca7-a268-90165fa6b10a" />

## ✨ Funcionalidades

- **Autenticação de usuários:** cadastro e login com gerenciamento de sessão.
- **Gerenciamento de perfil:** edição de nome, solicitação de alteração de e-mail e atualização de senha.
- **Gerenciamento de transações:** cadastro, edição e exclusão de receitas e despesas.
- **Dashboard financeiro:** acompanhamento de saldo, entradas e saídas do mês.
- **Navegação mensal:** consulta das movimentações por mês e ano.
- **Filtros e busca:** pesquisa por descrição, categoria e tipo de movimentação.
- **Compras parceladas:** geração automática das parcelas nos meses correspondentes.
- **Precisão nos cálculos:** tratamento de valores em centavos para evitar erros de arredondamento na divisão das parcelas.
- **Visualização financeira:** gráficos de movimentação diária e gastos por categoria.
- **Persistência de dados:** armazenamento das informações em banco de dados PostgreSQL.
- **Segurança de dados:** políticas de Row Level Security (RLS) para garantir que cada usuário acesse somente suas próprias transações.
- **Interface responsiva:** adaptação para diferentes tamanhos de tela.

## 🛠️ Tecnologias

| Tecnologia | Aplicação |
|---|---|
| React 19 | Construção da interface e componentização |
| TypeScript | Tipagem estática e segurança no desenvolvimento |
| Vite | Ambiente de desenvolvimento e build |
| Tailwind CSS v4 | Estilização e responsividade |
| Supabase | Autenticação e integração com o banco de dados |
| PostgreSQL | Persistência e gerenciamento dos dados |
| Row Level Security (RLS) | Controle de acesso aos dados por usuário |
| Vitest | Testes automatizados |
| Testing Library | Testes de componentes e interações |
| Oxlint | Análise estática do código |

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
- Autenticação e gerenciamento de sessões com Supabase.
- Integração de aplicação Front-End com banco de dados PostgreSQL.
- Implementação de políticas de segurança com Row Level Security (RLS).
- Atualização de dados de perfil utilizando Supabase Auth.
- Tratamento de valores monetários em centavos.
- Cálculo e distribuição de parcelas com precisão.
- Testes automatizados de funções e componentes com Vitest e Testing Library.
- Construção de interfaces responsivas e acessíveis.

## 🧪 Testes

O projeto possui **35 testes automatizados**, distribuídos entre regras financeiras e componentes da interface.

Para executar os testes uma única vez:

```bash
npm run test -- --run
```

Outras validações:

```bash
npm run typecheck  # Verifica a tipagem TypeScript
npm run build      # Gera o build de produção
npm run lint       # Executa a análise estática com Oxlint
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

### Configuração do Supabase

O projeto utiliza Supabase para autenticação e persistência dos dados.

Crie um projeto no [Supabase](https://supabase.com/) e configure as seguintes variáveis de ambiente em um arquivo `.env.local` na raiz do projeto:

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_publica_do_supabase
```

Substitua os valores pelos dados do seu projeto Supabase.

**Importante:** nunca compartilhe ou publique chaves secretas ou `service_role` no código ou no repositório.

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse o endereço informado pelo Vite no terminal, normalmente `http://localhost:5173`.

## 🚀 Deploy

A aplicação está publicada na Vercel, com integração ao repositório GitHub para atualização