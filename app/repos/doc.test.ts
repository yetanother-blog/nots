import { eq } from 'drizzle-orm';
import { createDoc, getDoc, updateDoc } from './doc';
import { docsTable } from '~/db/schema';
import { db } from '~/db';
import { v4 as uuid } from 'uuid';
import { SerializedEditorState } from '~/ui';

describe('createDoc', () => {
  it('creates a doc', async () => {
    const doc = await createDoc();
    const response = db.query.docsTable.findFirst({
      where: eq(docsTable.id, doc.id),
    });

    expect(response).toBeDefined();
  });
});

describe('getDoc', () => {
  it('returns doc if exists', async () => {
    const expectedDoc = await db.insert(docsTable).values({}).returning();
    const doc = await getDoc(expectedDoc[0].id);

    expect(doc).toBeDefined();
  });

  it('returns null if uuid invalid', async () => {
    const doc = await getDoc('abc');

    expect(doc).toBe(null);
  });

  it('returns null if not exists', async () => {
    const doc = await getDoc(uuid());

    expect(doc).toBe(null);
  });
});

describe('updateDoc', () => {
  it('updates the doc', async () => {
    const content: SerializedEditorState = {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,
        children: [],
        direction: 'ltr',
      },
    };

    const doc = await db.insert(docsTable).values({}).returning();

    await updateDoc(doc[0].id, content);

    const updatedDoc = await db.query.docsTable.findFirst({
      where: eq(docsTable.id, doc[0].id),
    });

    expect(updatedDoc?.content).toStrictEqual(content);
  });
});
