import { eq } from 'drizzle-orm';
import { validate as isValidUuid } from 'uuid';
import { db } from '~/db';
import { docsTable } from '~/db/schema';
import { ContentBlock } from '~/types/content';

export interface Doc {
  id: string;
  content: ContentBlock[];
  createdAt: Date;
  updatedAt: Date;
}

export async function createDoc(): Promise<Doc> {
  const response = await db.insert(docsTable).values({}).returning();
  return formatDoc(response[0]);
}

export async function getDoc(id: string): Promise<Doc | null> {
  if (!isValidUuid(id)) {
    return null;
  }

  const doc = await db.query.docsTable.findFirst({
    where: eq(docsTable.id, id),
  });

  return doc ? formatDoc(doc) : null;
}

export async function updateDoc(
  id: string,
  content: ContentBlock[]
): Promise<Doc> {
  const response = await db
    .update(docsTable)
    .set({
      content,
      updatedAt: new Date(),
    })
    .where(eq(docsTable.id, id))
    .returning();

  return formatDoc(response[0]);
}

function formatDoc(doc: typeof docsTable.$inferSelect): Doc {
  return {
    ...doc,
    content: doc.content as ContentBlock[],
  };
}
