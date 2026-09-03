# 💰 Fluxo — Controle Financeiro

Aplicação web responsiva para controle de entradas, despesas e compras parceladas, desenvolvida com **React e JavaScript** como projeto de portfólio para Front-end.

## 🚀 Demo

🔗 **[Acessar o projeto](https://fluxo-controle-financeiro-iota.vercel.app)**

## 📸 Preview

<img width="1366" height="603" alt="Captura de tela 2026-08-18 155541" src="https://github.com/user-attachments/assets/3d54635d-98b4-4ca7-a268-90165fa6b10a" />

## ✨ Funcionalidades

- Cadastro, edição e exclusão de transações (CRUD)
- Resumo mensal de saldo, entradas e saídas
- Navegação entre meses
- Filtro por tipo de movimentação
- Busca por descrição ou categoria
- Compras parceladas com geração automática das parcelas nos meses seguintes
- Divisão dos valores em centavos para evitar diferenças de arredondamento nas parcelas
- Análise visual dos gastos por categoria
- Persistência dos dados com `localStorage`
- Interface responsiva para desktop e dispositivos móveis
- Estados de lista vazia e feedback visual na interface

## 🛠️ Tecnologias

- **React** — componentes, Hooks e gerenciamento de estado
- **JavaScript** — lógica da aplicação e manipulação dos dados
- **Vite** — ambiente de desenvolvimento e build
- **CSS** — estilização, responsividade e visualização dos dados
- **LocalStorage** — persistência dos dados no navegador
- **Oxlint** — análise estática do código

## 🧠 O que pratiquei

Neste projeto desenvolvi uma aplicação React do início ao fim, praticando:

- Componentização e composição de interface
- Separação de regras de negócio em Hooks e utilitários
- `useState`, `useEffect` e `useMemo`
- CRUD de transações
- Formulários controlados
- Renderização condicional e listas
- Filtros e busca em tempo real
- Persistência de dados no navegador
- Cálculos financeiros com valores em centavos
- Geração e organização de compras parceladas
- Análise de gastos por categoria
- Navegação entre meses
- Responsividade
- Acessibilidade básica com atributos ARIA

## 💻 Como executar localmente

```bash
git clone https://github.com/llima598/fluxo-controle-financeiro.git
cd fluxo-controle-financeiro
npm install
npm run dev
```

Depois, abra no navegador o endereço exibido pelo Vite, normalmente `http://localhost:5173`.

## 🔮 Próximas melhorias

- [ ] Migrar o projeto para TypeScript
- [ ] Adicionar testes automatizados para regras financeiras
- [ ] Permitir gerenciamento de grupos de parcelas
- [ ] Criar despesas recorrentes
- [ ] Autenticação e banco de dados

## 👤 Autor

**Lucas Lima**

- [GitHub](https://github.com/llima598)
- [LinkedIn](https://www.linkedin.com/in/lucas-lima-231248191/)

---

Projeto desenvolvido como parte dos meus estudos e preparação para uma oportunidade profissional como **Desenvolvedor Front-end Júnior**.
