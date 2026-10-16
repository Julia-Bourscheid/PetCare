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
- Tailwind CSS
- Lucide React
- Next.js Route Handlers (API)
- PostgreSQL (Supabase) com `pg`
- Microsoft Clarity (`@microsoft/clarity`)

## Executar localmente

1. Copie `.env.example` para `.env` e preencha `DATABASE_URI` com a URL do
   **Session pooler** do Supabase (Connect > Session pooler). A conexão direta
   `db.<project-ref>.supabase.co` só tem IPv6 e não funciona em redes sem IPv6
   nem na Vercel. Para gravar sessões no Microsoft Clarity, preencha também
   `CLARITY_PROJECT_ID` (opcional).
2. Instale as dependências e crie as tabelas com os dados de demonstração:

```bash
npm install
npm run db:setup
npm run dev
```

Acesse `http://localhost:3000` e entre com `demo@petcare.com` / `petcare123`. A API `/api/appointments` roda junto com o front-end, no mesmo servidor.

Para testar o build de produção:

```bash
npm run build
npm start
```

## API

| Método | Endpoint | Função |
|---|---|---|
| POST | `/api/auth/register` | Cadastra um usuário |
| POST | `/api/auth/login` | Faz login e cria a sessão |
| POST | `/api/auth/logout` | Encerra a sessão |
| GET | `/api/pets` | Lista os pets do usuário |
| POST | `/api/pets` | Cadastra um pet |
| GET | `/api/appointments` | Lista compromissos |
| POST | `/api/appointments` | Cria compromisso |
| PUT | `/api/appointments?id=ID` | Edita compromisso |
| DELETE | `/api/appointments?id=ID` | Exclui compromisso |

As rotas de pets e compromissos exigem login e só acessam os dados do
usuário da sessão. As tabelas (`users`, `sessions`, `pets`, `appointments`) usam
`uuid` como chave e estão em `src/database/schema.sql`; as senhas são salvas
com hash scrypt.

## Estrutura

```text
src/
  app/
    api/appointments/route.ts   # API REST (GET, POST, PUT, DELETE)
    api/auth/                   # Cadastro, login e logout
    api/pets/route.ts           # Pets do usuário (listar e cadastrar)
    cadastro/                   # Cadastro de usuário
    compromissos/novo/          # Novo compromisso
    compromissos/[id]/editar/   # Editar compromisso
    dashboard/                  # Painel
    login/                      # Login
    pets/[petId]/               # Perfil do pet
    layout.tsx                  # Layout raiz (HTML, fonte, metadados)
    globals.css
  components/
    ClarityScript.tsx           # Carrega o Microsoft Clarity no navegador
    ui.ts                       # Classes Tailwind compartilhadas
  database/                     # Conexão, schema, seed e consultas SQL
  lib/                          # Senha, sessão e validação de uuid
  services/                     # Cliente da API usado pelas telas
  proxy.ts                      # Redireciona para /login sem sessão
  types.ts                      # Tipos compartilhados (User, Pet, Appointment)
```

## Apresentação

Cada integrante deve criar commits próprios no GitHub, com mensagens descritivas, para registrar as contribuições individuais.
