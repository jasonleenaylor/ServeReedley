import { describe, expect, it } from 'vitest';
import type { InventoryMessage } from './API';
import {
  buildInventoryMessageThreads,
  type InventoryMessageWithParent,
} from './inventoryMessageThreads';

const createMessage = (
  id: string,
  content: string,
  createdAt: string,
  overrides: Partial<InventoryMessageWithParent> = {}
): InventoryMessageWithParent =>
  ({
    id,
    content,
    authorId: 'user',
    authorName: 'User',
    resolved: false,
    createdAt,
    ...overrides,
  } as InventoryMessage);

describe('buildInventoryMessageThreads', () => {
  it('treats messages without parentMessageId as thread roots', () => {
    const root = createMessage('1', 'Root message', '2026-01-01T00:00:00.000Z');
    const reply = createMessage(
      '2',
      'Reply message',
      '2026-01-01T01:00:00.000Z',
      { parentMessageId: '1' }
    );

    const threads = buildInventoryMessageThreads([reply, root]);

    expect(threads).toHaveLength(1);
    expect(threads[0].root.id).toBe('1');
    expect(threads[0].replies.map((message) => message.id)).toEqual(['2']);
  });

  it('treats replies with missing parents as roots', () => {
    const orphanReply = createMessage(
      '3',
      'Orphan reply',
      '2026-01-01T02:00:00.000Z',
      { parentMessageId: 'missing-root' }
    );

    const threads = buildInventoryMessageThreads([orphanReply]);

    expect(threads).toHaveLength(1);
    expect(threads[0].root.id).toBe('3');
    expect(threads[0].replies).toHaveLength(0);
  });

  it('treats null and undefined parent ids as roots', () => {
    const undefinedParent = createMessage(
      '4',
      'Undefined parent root',
      '2026-01-01T03:00:00.000Z'
    );
    const nullParent = createMessage(
      '5',
      'Null parent root',
      '2026-01-01T04:00:00.000Z',
      { parentMessageId: null }
    );

    const threads = buildInventoryMessageThreads([nullParent, undefinedParent]);

    expect(threads.map((thread) => thread.root.id)).toEqual(['4', '5']);
  });
});
