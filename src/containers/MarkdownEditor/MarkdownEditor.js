import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMarkdownPlugin from '../../plugins/draft-js-markdown-plugin/src';
import keyBinding from '../../plugins/draft-js-markdown-plugin/src/utils/keyBinding';

const editorStyles = require('./editorStyles.css');
const markdownPlugin = createMarkdownPlugin();
const plugins = [markdownPlugin];

export default class MarkdownEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  handleKeyCommand = (command) => {
    const { editorState } = this.state;
    // if not inline component: skip
    switch (command) {
      case 'markdown-inline-autocomplete': {
        // Perform a request to save your contents, set
        // a new `editorState`, etc.
        const selection = editorState.getSelection();
        const anchorOffset = selection.getAnchorOffset();
        const focusOffset = selection.getFocusOffset();
        const newEditorState = EditorState.set(editorState, {
          selection: selection.merge({
            anchorOffset: anchorOffset + 1,
            focusOffset: focusOffset + 1,
          }),
          forceSelection: true,
        });
        this.setState({
          editorState: newEditorState
        });
        return true;
      }
      case 'markdown-inline-autocomplete-cm': {
        const selection = editorState.getSelection();
        const endKey = selection.getEndKey();
        const content = editorState.getCurrentContent();
        const textLength = content.getBlockForKey(endKey).getLength();
        const newEditorState = EditorState.set(editorState, { //eslint-disable-line
          selection: selection.merge({
            anchorKey: endKey,
            anchorOffset: textLength,
            focusKey: endKey,
            focusOffset: textLength,
            isBackward: false,
          }),
          forceSelection: true,
        });
        this.setState({
          editorState: newEditorState
        });
        return true;
      }
      case 'markdown-inline-autocomplete-op':
        return true;
      case 'markdown-inline-autocomplete-sh':
        return true;
      default:
        return false;
    }
  }

  focus = () => {
    this.refs.editor.focus();
  }

  render() {
    return (
      <div className={ editorStyles.editor } onClick={ this.focus }>
        <Editor
          editorState={ this.state.editorState }
          onChange={ this.onChange }
          plugins={ plugins }
          handleKeyCommand={ this.handleKeyCommand }
          keyBindingFn={ keyBinding }
          ref="editor"
        />
      </div>
    );
  }
}
