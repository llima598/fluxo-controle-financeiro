# 💰 Fluxo — Controle Financeiro

Aplicação web responsiva para controle de entradas, despesas e compras parceladas, desenvolvida com **React e TypeScript** como projeto de portfólio para Front-end.

## 🚀 Demo

🔗 **[Acessar o projeto](https://fluxo-controle-financeiro-iota.vercel.app)**

## 📸 Preview

<img width="1366" height="603" alt="Captura de tela 2026-08-18 155541" src="https://github.com/user-attachments/assets/3d54635d-98b4-4ca7-a268-90165fa6b10a" />

## ✨ Funcionalidades

* Cadastro, edição e exclusão de transações (CRUD)
* Resumo mensal de saldo, entradas e saídas
* Navegação entre meses
* Filtro por tipo de movimentação
* Busca por descrição ou categoria
* Compras parceladas com geração automática das parcelas nos meses seguintes
* Divisão dos valores em centavos para evitar diferenças de arredondamento nas parcelas
* Análise visual dos gastos por categoria
* Persistência dos dados com `localStorage`
* Interface responsiva para desktop e dispositivos móveis
* Estados de lista vazia e feedback visual na interface

## 🛠️ Tecnologias

* **React** — construção da interface, componentes e Hooks
* **TypeScript** — tipagem estática e maior segurança no desenvolvimento
* **Vite** — ambiente de desenvolvimento e build
* **Vitest** — testes automatizados das regras financeiras
* **CSS** — estilização, responsividade e visualização dos dados
* **localStorage** — persistência dos dados no navegador
* **Oxlint** — análise estática e padronização do código

## 🧠 O que pratiquei

Neste projeto desenvolvi uma aplicação React do início ao fim, praticando:

* Componentização e composição de interfaces
* Tipagem estática com TypeScript
* Separação de regras de negócio em Hooks e funções utilitárias
* Gerenciamento de estado com `useState`, `useEffect` e `useMemo`
* CRUD completo de transações
* Formulários controlados e manipulação de dados tipados
* Filtros, busca e renderização condicional
* Persistência de dados com `localStorage`
* Cálculos financeiros utilizando valores em centavos
* Geração automática e organização de compras parceladas
* Tratamento de diferenças de arredondamento entre parcelas
* Visualização de gastos por categoria e evolução financeira diária
* Navegação e filtragem por período
* Testes automatizados com Vitest
* Responsividade para diferentes tamanhos de tela
* Acessibilidade básica com atributos ARIA

## 💻 Como executar localmente

```bash
git clone https://github.com/llima598/fluxo-controle-financeiro.git
cd fluxo-controle-financeiro
npm install
npm run dev
```

Depois, abra no navegador o endereço exibido pelo Vite, normalmente `http://localhost:5173`.

### Comandos disponíveis

```bash
npm run build       # Gera o build de produção
npm run typecheck   # Verifica a tipagem do TypeScript
npm run lint        # Analisa o código com Oxlint
npm run test        # Executa os testes automatizados
```

## 🔮 Próximas melhorias

* [ ] Permitir gerenciamento de grupos de parcelas
* [ ] Criar despesas recorrentes
* [ ] Adicionar autenticação de usuários
* [ ] Integrar com uma API e banco de dados

## 👤 Autor

**Lucas Lima**

* [GitHub](https://github.com/llima598)
* [LinkedIn](https://www.linkedin.com/in/lucas-lima-231248191/)

---

Projeto desenvolvido como parte dos meus estudos e preparação para uma oportunidade profissional como **Desenvolvedor Front-end Júnior**.
