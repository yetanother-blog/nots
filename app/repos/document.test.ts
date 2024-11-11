import { eq } from 'drizzle-orm';
import { createDocument, getDocument, updateDocument } from './document';
import { documentsTable } from '~/db/schema';
import { db } from '~/db';
import { v4 as uuid } from 'uuid';

describe('createDocument', () => {
  it('creates a document', async () => {
    const document = await createDocument();
    const response = db.query.documentsTable.findFirst({
      where: eq(documentsTable.id, document.id),
    });

    expect(response).toBeDefined();
  });
});

describe('getDocument', () => {
  it('returns document if exists', async () => {
    const expectedDocument = await db
      .insert(documentsTable)
      .values({})
      .returning();
    const document = await getDocument(expectedDocument[0].id);

    expect(document).toBeDefined();
  });

  it('returns null if uuid invalid', async () => {
    const document = await getDocument('abc');

    expect(document).toBe(null);
  });

  it('returns null if not exists', async () => {
    const document = await getDocument(uuid());

    expect(document).toBe(null);
  });
});

describe('updateDocument', () => {
  it('updates the document', async () => {
    const content = 'new content';
    const document = await db
      .insert(documentsTable)
      .values({})
      .returning();

    await updateDocument(document[0].id, content);

    const updatedDocument = await db.query.documentsTable.findFirst({
      where: eq(documentsTable.id, document[0].id),
    });

    expect(updatedDocument?.content).toBe(content);
  });
});
