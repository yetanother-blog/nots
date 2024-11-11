import {
  json,
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { eq } from "drizzle-orm";
import invariant from "tiny-invariant";
import { db } from "~/db";
import { documentsTable } from "~/db/schema";

export const meta: MetaFunction = () => {
  return [{ title: "Document" }];
};

export async function loader({ params: { docId } }: LoaderFunctionArgs) {
  invariant(docId, "Document ID is required");

  const document = await db.query.documentsTable.findFirst({
    where: eq(documentsTable.id, docId),
  });

  if (!document) {
    return redirect("/");
  }

  return json({ document });
}

export default function DocumentPage() {
  const { document } = useLoaderData<typeof loader>();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            {document.id}
          </h1>
        </header>
      </div>
    </div>
  );
}
