import { redirect } from '@remix-run/node';
import { createDocument } from '~/repos/doc';

export async function loader() {
  const document = await createDocument();
  return redirect(`/${document.id}`);
}
