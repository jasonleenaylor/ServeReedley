# Email notification setup

Request notification email lists are stored in DynamoDB (GraphQL models), not AWS Secrets Manager.

## After `amplify push`

Deploy the schema and Lambda changes, then seed data before relying on emails in production.

### 1. App email settings

In the app (SysOps user on **Team Management** `/teams`), or via AppSync:

- Create `AppEmailSettings` with `id: "default"` and `fromAddress` set to your verified SES sender (same value previously in `request-email-info` → `fromAddress`).

### 2. Notification recipients

Migrate addresses from the old secret `sysopAddresses` comma-separated list:

| Role | Used when |
|------|-----------|
| `NEW_REQUEST` | A new public request is submitted |
| `STALE_REQUEST_REMINDER` | Weekly reminder for requests still `NEW` after 7 days |

Add one `NotificationRecipient` row per email per role. Set `enabled: true`.

### 3. Coordinators (vetted requests)

When a request status becomes **VETTED**, email goes to **coordinators** linked to teams whose `teamType` matches any `needTypes` on the request.

1. Create `Coordinator` records (name, email, enabled).
2. Assign each `Team` a `coordinatorID` (Team Management → Team coordinator assignment).

Team lead email (`Team.email`) is unchanged; `NotifyTeamOnRequest` still emails team leads when a `TeamRequest` is created.

### 4. Retire Secrets Manager (optional)

After verifying emails in dev/prod:

- Confirm Lambdas no longer need `request-email-info`.
- Remove or archive the secret in AWS Secrets Manager.

## SysOps UI

Signed-in users in the **SysOps** Cognito group see extra sections on `/teams`:

- Email sender (SES from address)
- Notification recipient lists
- Coordinators
- Per-team coordinator assignment

Users in the **Coordinators** group (without SysOps) can manage teams but **not** email settings. Add the user to the SysOps group in Cognito if they need the admin UI.

The feature branch frontend must be **deployed** (merged to `main` or hosted from the feature branch). The production `main` build before merge will not show these sections.

## Troubleshooting

| Symptom | Likely cause |
|---------|----------------|
| No email settings on `/teams` | Not in SysOps group, or frontend not deployed from the feature branch |
| Create team fails silently | Open browser devtools → Console/Network; ensure `amplify push` ran on dev and you are signed in |
| GraphQL error on `coordinatorID` | Backend schema not pushed to dev; run `amplify push` on the dev env |
| Admin UI loads but mutations fail | Cognito user not in SysOps (Coordinator/NotificationRecipient are SysOps-only) |

## Adding a new vetter / admin email

1. Add the Cognito user and SES identity as in [README.md](../README.md) (login access).
2. Add a `NotificationRecipient` with role `NEW_REQUEST` (and optionally `STALE_REQUEST_REMINDER`) in Team Management.

Do not edit Secrets Manager for notification lists.
