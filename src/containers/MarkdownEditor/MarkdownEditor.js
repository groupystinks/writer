import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMarkdownPlugin from '../../plugins/draft-js-markdown-plugin/src';
import keyBinding from '../../plugins/draft-js-markdown-plugin/src/utils/keyBinding';
import {
  distanceToMoveForwardToBd
} from '../../plugins/draft-js-markdown-plugin/src/utils/moveForward';

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
        const selection = editorState.getSelection();
        const anchorOffset = selection.getAnchorOffset();
        const focusOffset = selection.getFocusOffset();
        if (anchorOffset !== focusOffset) {
          const newEditorState = EditorState.set(editorState, {
            selection: selection.merge({
              anchorOffset: focusOffset,
              focusOffset,
            }),
            forceSelection: true,
          });
          this.setState({
            editorState: newEditorState
          });
          return true;
        }
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
      case 'markdown-inline-autocomplete-cm-sh': {
        const selection = editorState.getSelection();
        const endKey = selection.getEndKey();
        const content = editorState.getCurrentContent();
        const textLength = content.getBlockForKey(endKey).getLength();
        const newEditorState = EditorState.set(editorState, { //eslint-disable-line
          selection: selection.merge({
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
      case 'markdown-inline-autocomplete-op-sh': {
        const selection = editorState.getSelection();
        const offset = selection.getStartOffset();
        const anchorOffset = selection.getAnchorOffset();
        const key = selection.getStartKey();
        const content = editorState.getCurrentContent();
        const text = content.getBlockForKey(key).getText().slice(offset);
        const distance = distanceToMoveForwardToBd(text);
        const newEditorState = EditorState.set(editorState, { //eslint-disable-line
          selection: selection.merge({
            anchorKey: key,
            anchorOffset,
            focusKey: key,
            focusOffset: anchorOffset + distance,
            isBackward: false,
          }),
          forceSelection: true,
        });
        this.setState({
          editorState: newEditorState
        });
        return true;
      }
      case 'markdown-inline-autocomplete-op': {
        const selection = editorState.getSelection();
        const offset = selection.getStartOffset();
        const anchorOffset = selection.getAnchorOffset();
        const key = selection.getStartKey();
        const content = editorState.getCurrentContent();
        const text = content.getBlockForKey(key).getText().slice(offset);
        const distance = distanceToMoveForwardToBd(text);
        const newEditorState = EditorState.set(editorState, { //eslint-disable-line
          selection: selection.merge({
            anchorKey: key,
            anchorOffset: anchorOffset + distance,
            focusKey: key,
            focusOffset: anchorOffset + distance,
            isBackward: false,
          }),
          forceSelection: true,
        });
        this.setState({
          editorState: newEditorState
        });
        return true;
      }
      case 'markdown-inline-autocomplete-sh': {
        const selection = editorState.getSelection();
        const anchorOffset = selection.getAnchorOffset();
        const focusOffset = selection.getFocusOffset();
        const newEditorState = EditorState.set(editorState, {
          selection: selection.merge({
            anchorOffset,
            focusOffset: focusOffset + 1,
          }),
          forceSelection: true,
        });
        this.setState({
          editorState: newEditorState
        });
        return true;
      }
      default:
        console.log('not catched');
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
