# Agent context for ServeReedley

ServeReedley is an AWS Amplify full-stack Community Resource Network (CRN) web application (React + TypeScript) that coordinates community assistance for people in need.

**Read the rest of your context from these docs:**

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — repo overview, tech stack, build/test commands, directory structure, key files, GraphQL/Lambda notes, testing guidelines, common issues
- [docs/workflows/](docs/workflows/) — step-by-step workflows (update GraphQL model: complete Amplify codegen and verify build before any UX code; then optionally [implementing UX after a model change](docs/workflows/NEW_UX_WITH_GRAPHQL_MODEL.md); change a Lambda)

**Critical constraints:**

- `src/aws-exports.js` is required for build (gitignored; create a mock for local dev — see docs/ARCHITECTURE.md).
- `src/API.ts` and `src/graphql/*` are generated; do not edit. Schema changes go in `amplify/backend/api/crn/schema.graphql`; run `amplify push` to regenerate.
- Each Lambda under `amplify/backend/function/<name>/src/` has its own `package.json`; run `npm install` in that `src/` when changing dependencies or code.
