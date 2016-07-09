import { Modifier, EditorState, Entity, SelectionState } from 'draft-js';

const addTag = ({ blockKey, editorState, tag, entityType, targetRange }) => {
  /*
   * Need ability to "not continue" a mutable entity
   * waiting pull request https://github.com/facebook/draft-js/pull/510/files.
   */
  const entityKey = Entity.create(entityType, 'MUTABLE', { tag });
  const autoEndingTagContent = Modifier.insertText(
    editorState.getCurrentContent(),
    editorState.getSelection(),
    tag,
  );
  const appliedEntityContent = Modifier.applyEntity(
    autoEndingTagContent,
    targetRange,
    entityKey
  );

  const selection = editorState.getSelection();
  const focusOffset = selection.getFocusOffset();

  // new SelectionState after adding tag. Caret should be at the end of word
  const afterTagSelection = new SelectionState({
    anchorOffset: focusOffset + 2,
    focusOffset: focusOffset + 2,
    anchorKey: blockKey,
    focusKey: blockKey
  });

  const newEditorState = EditorState.push(
    editorState,
    appliedEntityContent,
    'insert-tag',
  );

  return EditorState.forceSelection(newEditorState, afterTagSelection);
};

export default addTag;
