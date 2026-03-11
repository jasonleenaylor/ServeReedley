import type { InventoryMessage } from './API';

export type InventoryMessageWithParent = InventoryMessage & {
  parentMessageId?: string | null;
};

export interface InventoryMessageThread {
  root: InventoryMessageWithParent;
  replies: InventoryMessageWithParent[];
}

const toTimestamp = (value?: string | null): number =>
  value ? new Date(value).getTime() : 0;

export const buildInventoryMessageThreads = (
  messages: InventoryMessageWithParent[]
): InventoryMessageThread[] => {
  const byId = new Map(messages.map((message) => [message.id, message]));
  const repliesByParent = new Map<string, InventoryMessageWithParent[]>();
  const roots: InventoryMessageWithParent[] = [];

  [...messages]
    .sort((a, b) => toTimestamp(a.createdAt) - toTimestamp(b.createdAt))
    .forEach((message) => {
      const parentId = message.parentMessageId;
      if (!parentId || !byId.has(parentId)) {
        roots.push(message);
        return;
      }
      const replies = repliesByParent.get(parentId) ?? [];
      replies.push(message);
      repliesByParent.set(parentId, replies);
    });

  return roots.map((root) => ({
    root,
    replies: (repliesByParent.get(root.id) ?? []).sort(
      (a, b) => toTimestamp(a.createdAt) - toTimestamp(b.createdAt)
    ),
  }));
};
