export enum NotificationListRole {
  NEW_REQUEST = "NEW_REQUEST",
}

export type NotificationRecipient = {
  id: string;
  role: NotificationListRole;
  email: string;
  displayName?: string | null;
  enabled: boolean;
};

export type AppEmailSettings = {
  id: string;
  fromAddress: string;
};

export type Coordinator = {
  id: string;
  name: string;
  email: string;
  enabled: boolean;
};
