import { eq } from "drizzle-orm";
import { db } from "~/db";
import { documentsTable } from "~/db/schema";

export interface Document {
  id: string;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export async function createDocument(): Promise<Document> {
  const response = await db.insert(documentsTable).values({}).returning();
  return response[0];
}

export async function getDocument(id: string): Promise<Document | undefined> {
  const response = await db.query.documentsTable.findFirst({
    where: eq(documentsTable.id, id),
  })

  return response;
}
