import { eq } from 'drizzle-orm';
import { validate as isValidUuid } from 'uuid';
import { db } from '~/db';
import { documentsTable } from '~/db/schema';

export interface Document {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function createDocument(): Promise<Document> {
  const response = await db.insert(documentsTable).values({}).returning();
  return response[0];
}

export async function getDocument(id: string): Promise<Document | null> {
  if (!isValidUuid(id)) {
    return null;
  }

  const document = await db.query.documentsTable.findFirst({
    where: eq(documentsTable.id, id),
  })

  return document ?? null;
}

export async function updateDocument({ id, ...rest }: Document): Promise<Document> {
  const response = await db.update(documentsTable).set({
    ...rest,
    updatedAt: new Date(),
  }).where(eq(documentsTable.id, id)).returning();

  return response[0];
}
