import { redirect } from '@remix-run/node';
import { createDoc } from '~/repos/doc';

export async function loader() {
  const doc = await createDoc();
  return redirect(`/${doc.id}`);
}
