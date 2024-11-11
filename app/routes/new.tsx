import { redirect } from "@remix-run/node";
import { db } from "~/db";
import { documentsTable } from "~/db/schema";

export async function loader() {
  const document = await db.insert(documentsTable).values({}).returning();
  return redirect(`/${document[0].id}`);
}
