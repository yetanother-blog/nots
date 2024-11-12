import {
  json,
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node';
import {
  ShouldRevalidateFunction,
  useLoaderData,
  useSubmit,
} from '@remix-run/react';
import invariant from 'tiny-invariant';
import { getDocument, updateDocument } from '~/repos/doc';
import sanitizeHtml from 'sanitize-html';

export const meta: MetaFunction = () => {
  return [{ title: 'Document' }];
};

export const shouldRevalidate: ShouldRevalidateFunction = () => {
  return false;
};

export async function loader({ params: { docId } }: LoaderFunctionArgs) {
  invariant(docId, 'Document ID is required');

  const document = await getDocument(docId);

  if (!document) {
    return redirect('/');
  }

  return json({ document });
}

export async function action({
  request,
  params: { docId },
}: LoaderFunctionArgs) {
  invariant(docId, 'Document ID is required');

  const formData = await request.formData();
  const content = formData.get('content') as string;
  const sanitizedContent = sanitizeHtml(content, {
    allowedTags: ['b', 'i', 'p', 'br', 'h1', 'h2', 'h3'],
  });

  await updateDocument(docId, sanitizedContent);

  return json({ ok: true });
}

export default function DocumentPage() {
  const { document } = useLoaderData<typeof loader>();
  const submit = useSubmit();

  const handleChange = (event: React.ChangeEvent<HTMLDivElement>) => {
    submit(
      { content: event.currentTarget.innerHTML },
      { method: 'post', replace: true, navigate: false }
    );
  };

  return (
    <div className="p-8 flex gap-3 flex-col">
      <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
        Document {document.id}
      </h1>
      <div
        onInput={handleChange}
        contentEditable
        dangerouslySetInnerHTML={{
          __html:
            document.content === '' ? '<p>Start here …</p>' : document.content,
        }}
      ></div>
    </div>
  );
}
