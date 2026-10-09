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
- Next.js (App Router)
- TypeScript
- Lucide React
- Next.js Route Handlers (API)

## Executar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`. A API `/api/appointments` roda junto com o front-end, no mesmo servidor.

Para testar o build de produção:

```bash
npm run build
npm start
```

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
  app/
    api/appointments/route.ts   # API REST (GET, POST, PUT, DELETE)
    compromissos/novo/          # Novo compromisso
    compromissos/[id]/editar/   # Editar compromisso
    dashboard/                  # Painel
    login/                      # Login
    pets/[petId]/               # Perfil do pet
    layout.tsx                  # Layout raiz (HTML, fonte, metadados)
    globals.css
  components/
  data/
  services/
  types.ts                      # Tipos compartilhados (Pet, Appointment)
```

## Apresentação

Cada integrante deve criar commits próprios no GitHub, com mensagens descritivas, para registrar as contribuições individuais.
