import { Modifier, EditorState, Entity } from 'draft-js';

const addTag = (editorState, tag) => {
  const entityKey = Entity.create('markdown', 'MUTABLE', { tag });

  const autoEndingTagContent = Modifier.insertText(
    editorState.getCurrentContent(),
    editorState.getCurrentContent().getSelectionAfter(),
    tag,
    null,
    entityKey
  );

  const newEditorState = EditorState.push(
    editorState,
    autoEndingTagContent,
    'insert-tag',
  );

  console.log('getSelectionAfter', autoEndingTagContent.getSelectionAfter());
  return EditorState.forceSelection(newEditorState, autoEndingTagContent.getSelectionAfter());
};

export default addTag;
