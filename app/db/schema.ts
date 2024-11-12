import { pgTable, jsonb, uuid, timestamp } from 'drizzle-orm/pg-core';

export const documentsTable = pgTable('documents', {
  id: uuid().primaryKey().defaultRandom(),
  content: jsonb().notNull().default([]),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow(),
  deletedAt: timestamp(),
});
