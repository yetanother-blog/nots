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
import { getDoc, updateDoc } from '~/repos/doc';
import { Editor, EditorState } from '~/ui';

export const meta: MetaFunction = () => {
  return [{ title: 'Document' }];
};

export const shouldRevalidate: ShouldRevalidateFunction = () => {
  return false;
};

export async function loader({ params: { docId } }: LoaderFunctionArgs) {
  invariant(docId, 'Document ID is required');

  const doc = await getDoc(docId);

  if (!doc) {
    return redirect('/');
  }

  return json({ doc });
}

export async function action({
  request,
  params: { docId },
}: LoaderFunctionArgs) {
  invariant(docId, 'Document ID is required');

  const data = await request.json();
  await updateDoc(docId, data.content);

  return json({ ok: true });
}

export default function DocumentPage() {
  const { doc } = useLoaderData<typeof loader>();
  const submit = useSubmit();

  const handleChange = (editorState: EditorState) => {
    const content = editorState.toJSON();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = { content } as any;

    submit(data, {
      method: 'post',
      encType: 'application/json',
      replace: true,
      navigate: false,
    });
  };

  return (
    <div className="p-8 flex gap-3 flex-col">
      <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
        Document {doc.id}
      </h1>
      <Editor onChange={handleChange} initialEditorState={doc.content} />
    </div>
  );
}
