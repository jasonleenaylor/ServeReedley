# Implementing UX after a GraphQL model change

Use this doc **only after** you have completed [UPDATE_GRAPHQL_MODEL.md](UPDATE_GRAPHQL_MODEL.md) and verified that Amplify codegen has run and the app builds. Do not add or change UX (routes, components, i18n) until the model change and codegen are done and `npm run build` passes.

## Prerequisite

- [docs/workflows/UPDATE_GRAPHQL_MODEL.md](UPDATE_GRAPHQL_MODEL.md) completed through step 4 (verify codegen; build succeeds).
- New types and operations are present in `src/API.ts` and `src/graphql/`.

## Then: where to add UX

- **Routes:** Add `<Route path="..." element={...} />` in `src/App.tsx`. Follow existing routes (e.g. `/request-need`, `/requests`, `/reports`, `/teams`, `/team`). Use auth for coordinator-only routes.
- **Components:** Add under `src/`. Use functional components, MUI (`@mui/material`), theme from `src/theme.ts`. Follow patterns in `needRequestForm.tsx`, `NeedRequestTable.tsx`, `TeamPicker.tsx`, `ReportForm.tsx`.
- **Types and data:** Use generated types from `src/API.ts` (or `src/RequestAPI.ts` per [docs/ARCHITECTURE.md](../ARCHITECTURE.md)) and operations from `src/graphql/`. Do not edit generated files.
- **i18n:** Add keys to `src/en.json` and `src/es.json`; use `useTranslation()` and `t('key')` as in existing components.
- **Tests:** Add `src/*.test.tsx` following `App.test.tsx`, `TeamList.test.tsx`, `TeamPicker.test.tsx`; mock Amplify/GraphQL. Run `npm test` and `npm run build`.

## Reference

- **Model change and codegen (do first):** [UPDATE_GRAPHQL_MODEL.md](UPDATE_GRAPHQL_MODEL.md)
- **Full context:** [docs/ARCHITECTURE.md](../ARCHITECTURE.md)
- **Entrypoint for agents:** [AGENTS.md](../../AGENTS.md)
