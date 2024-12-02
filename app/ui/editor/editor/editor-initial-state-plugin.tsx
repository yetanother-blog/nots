import { FC, useEffect, useState } from 'react';
import { SerializedEditorState } from './editor';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export interface EditorInitialStatePluginProps {
  initialEditorState?: SerializedEditorState;
}

export const EditorInitialStatePlugin: FC<EditorInitialStatePluginProps> = ({
  initialEditorState,
}) => {
  const [editor] = useLexicalComposerContext();
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    if (!isInitialRender || !initialEditorState) {
      return;
    }

    const state = editor.parseEditorState(initialEditorState);
    editor.setEditorState(state);
    setIsInitialRender(false);
  }, [editor, initialEditorState, isInitialRender]);

  return null;
};
