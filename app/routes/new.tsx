import { redirect } from "@remix-run/node";
import { createDocument } from "~/repos/document";

export async function loader() {
  const document = await createDocument();
  return redirect(`/${document.id}`);
}
