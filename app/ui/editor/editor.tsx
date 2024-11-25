import { FC } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import {
  EditorState as LexicalEditorState,
  SerializedEditorState as LexicalSerializedEditorState,
  LexicalEditor,
} from 'lexical';
import { EditorInitialStatePlugin } from './editor-initial-state-plugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { CodeNode } from '@lexical/code';
import { ListItemNode, ListNode } from '@lexical/list';
import { LinkNode } from '@lexical/link';

export type EditorState = LexicalEditorState;

export type SerializedEditorState = LexicalSerializedEditorState;

export interface EditorProps {
  onChange: (
    editorState: EditorState,
    editor: LexicalEditor,
    tags: Set<string>
  ) => void;
  initialEditorState?: SerializedEditorState;
}

export const Editor: FC<EditorProps> = ({ onChange, initialEditorState }) => {
  return (
    <LexicalComposer
      initialConfig={{
        namespace: 'editor',
        onError: (error: Error) => {
          console.error(error);
        },
        nodes: [
          HeadingNode,
          QuoteNode,
          CodeNode,
          ListNode,
          ListItemNode,
          LinkNode,
        ],
      }}
    >
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <OnChangePlugin onChange={onChange} />
      <EditorInitialStatePlugin initialEditorState={initialEditorState} />
      <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
    </LexicalComposer>
  );
};
