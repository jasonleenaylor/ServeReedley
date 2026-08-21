export const recipientsByRole = /* GraphQL */ `
  query RecipientsByRole(
    $role: NotificationListRole!
    $limit: Int
    $nextToken: String
  ) {
    recipientsByRole(role: $role, limit: $limit, nextToken: $nextToken) {
      items {
        id
        role
        email
        displayName
        enabled
      }
      nextToken
    }
  }
`;

export const createNotificationRecipient = /* GraphQL */ `
  mutation CreateNotificationRecipient($input: CreateNotificationRecipientInput!) {
    createNotificationRecipient(input: $input) {
      id
      role
      email
      displayName
      enabled
    }
  }
`;

export const updateNotificationRecipient = /* GraphQL */ `
  mutation UpdateNotificationRecipient($input: UpdateNotificationRecipientInput!) {
    updateNotificationRecipient(input: $input) {
      id
      role
      email
      displayName
      enabled
    }
  }
`;

export const deleteNotificationRecipient = /* GraphQL */ `
  mutation DeleteNotificationRecipient($input: DeleteNotificationRecipientInput!) {
    deleteNotificationRecipient(input: $input) {
      id
    }
  }
`;

export const getAppEmailSettings = /* GraphQL */ `
  query GetAppEmailSettings($id: ID!) {
    getAppEmailSettings(id: $id) {
      id
      fromAddress
    }
  }
`;

export const createAppEmailSettings = /* GraphQL */ `
  mutation CreateAppEmailSettings($input: CreateAppEmailSettingsInput!) {
    createAppEmailSettings(input: $input) {
      id
      fromAddress
    }
  }
`;

export const updateAppEmailSettings = /* GraphQL */ `
  mutation UpdateAppEmailSettings($input: UpdateAppEmailSettingsInput!) {
    updateAppEmailSettings(input: $input) {
      id
      fromAddress
    }
  }
`;

export const listCoordinators = /* GraphQL */ `
  query ListCoordinators($limit: Int, $nextToken: String) {
    listCoordinators(limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        enabled
      }
      nextToken
    }
  }
`;

export const createCoordinator = /* GraphQL */ `
  mutation CreateCoordinator($input: CreateCoordinatorInput!) {
    createCoordinator(input: $input) {
      id
      name
      email
      enabled
    }
  }
`;

export const updateCoordinator = /* GraphQL */ `
  mutation UpdateCoordinator($input: UpdateCoordinatorInput!) {
    updateCoordinator(input: $input) {
      id
      name
      email
      enabled
    }
  }
`;

export const deleteCoordinator = /* GraphQL */ `
  mutation DeleteCoordinator($input: DeleteCoordinatorInput!) {
    deleteCoordinator(input: $input) {
      id
    }
  }
`;

export const createTeamWithCoordinator = /* GraphQL */ `
  mutation CreateTeamWithCoordinator($input: CreateTeamInput!) {
    createTeam(input: $input) {
      id
      teamName
      teamType
      email
      coordinatorID
    }
  }
`;

export const updateTeamCoordinator = /* GraphQL */ `
  mutation UpdateTeamCoordinator($input: UpdateTeamInput!) {
    updateTeam(input: $input) {
      id
      teamName
      teamType
      email
      coordinatorID
    }
  }
`;

export const DEFAULT_EMAIL_SETTINGS_ID = "default";
