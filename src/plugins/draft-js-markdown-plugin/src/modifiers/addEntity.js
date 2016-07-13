import { Modifier, EditorState, Entity, SelectionState } from 'draft-js';

const addEntity = ({ blockKey, editorState, entityType, targetRange }) => {
  const entityKey = Entity.create(entityType, 'MUTABLE');
  const appliedEntityContent = Modifier.applyEntity(
    editorState.getCurrentContent(),
    targetRange,
    entityKey
  );

  const selection = editorState.getSelection();
  const focusOffset = selection.getFocusOffset();

  // new SelectionState after adding tag. Caret should be at the end of word
  const afterEntitySelection = new SelectionState({
    anchorOffset: focusOffset,
    focusOffset,
    anchorKey: blockKey,
    focusKey: blockKey
  });

  const newEditorState = EditorState.push(
    editorState,
    appliedEntityContent,
    'add-entity',
  );

  return EditorState.forceSelection(newEditorState, afterEntitySelection);
};

export default addEntity;
