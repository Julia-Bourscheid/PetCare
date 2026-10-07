# 🐾 PetCare

Projeto acadêmico da Avaliação 2 — Projeto de Desenvolvimento Web.

## Objetivo

Aplicação responsiva para organização da rotina e dos cuidados de pets.

## Requisitos atendidos

- 3+ telas responsivas
- Componentes reutilizáveis
- Busca/seleção/filtros, modal e manipulação de dados
- Formulário com 6 campos, validações e mensagens de erro
- API REST com GET, POST, PUT e DELETE
- Tratamento de loading e erros da API
- Acessibilidade com labels, HTML semântico, foco e atributos ARIA
- Preparado para publicação na Vercel

## Tecnologias

- React
- Vite
- React Router
- Lucide React
- Vercel Serverless Function

## Executar localmente

```bash
npm install
npm run dev
```

> Para testar também a API `/api/appointments` localmente, use a Vercel CLI (`npx vercel dev`) ou publique o projeto na Vercel. O front-end foi preparado para consumir a função no mesmo domínio.

## API

| Método | Endpoint | Função |
|---|---|---|
| GET | `/api/appointments` | Lista compromissos |
| POST | `/api/appointments` | Cria compromisso |
| PUT | `/api/appointments?id=ID` | Edita compromisso |
| DELETE | `/api/appointments?id=ID` | Exclui compromisso |

A API é propositalmente mockada/em memória, pois o enunciado permite retorno mockado e não exige banco de dados.

## Estrutura

```text
src/
  components/
  data/
  pages/
  services/
api/
  appointments.js
```

## Apresentação

Cada integrante deve criar commits próprios no GitHub, com mensagens descritivas, para registrar as contribuições individuais.
