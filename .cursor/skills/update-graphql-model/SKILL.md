---
name: update-graphql-model
description: Update the GraphQL schema and frontend usage for the CRN API. Use when the user wants to change the GraphQL model, add types or fields, or run the amplify schema push workflow.
---

# Update GraphQL model

Follow the steps in the tool-agnostic workflow doc. Do not duplicate the full workflow here.

1. **Read and follow:** [docs/workflows/UPDATE_GRAPHQL_MODEL.md](../../../docs/workflows/UPDATE_GRAPHQL_MODEL.md)
2. **Conventions and do-not-edit list:** [docs/ARCHITECTURE.md](../../../docs/ARCHITECTURE.md)

Execute the steps in order (amplify pull -> edit schema -> amplify push -> verify codegen and build before any UX code -> then update frontend -> test -> commit). Do not implement or change UX until codegen is complete and `npm run build` passes. Respect caveats (e.g. avoid test data the frontend does not yet support).
