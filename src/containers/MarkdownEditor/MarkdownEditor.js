import React, { Component } from 'react';
import { EditorState, Modifier, SelectionState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMarkdownPlugin from '../../plugins/draft-js-markdown-plugin/src';
import keyBinding from '../../plugins/draft-js-markdown-plugin/src/utils/keyBinding';
import {
  distanceToMoveForwardToBd
} from '../../plugins/draft-js-markdown-plugin/src/utils/moveForward';
import addTag from '../../plugins/draft-js-markdown-plugin/src/modifiers/addTag';
import addEntity from '../../plugins/draft-js-markdown-plugin/src/modifiers/addEntity';


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
      // TODO: handle jump to next line
      case 'markdown-inline-autocomplete': {
        const selection = editorState.getSelection();
        const anchorOffset = selection.getAnchorOffset();
        const focusOffset = selection.getFocusOffset();
        const offset = selection.getStartOffset();
        const key = selection.getStartKey();
        const content = editorState.getCurrentContent();
        const pretext = content.getBlockForKey(key).getText().slice(0, offset);
        const protext = content.getBlockForKey(key).getText().slice(offset);
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
        } else if (
          pretext.match(/\*\*/g) &&
          pretext.match(/\*\*/g).length % 2 === 1 &&
          (protext === '' ||
          protext.match(/\*\*/g) &&
          !(protext.match(/\*\*/g).length % 2 === 1))
        ) {
          const currentWord = pretext.split('**').slice(-1)[0];
          const targetRange = new SelectionState({
            anchorOffset: anchorOffset - currentWord.length - 2,
            focusOffset: focusOffset + 2,
            anchorKey: key,
            focusKey: key
          });
          const newEditorState = addTag({
            blockKey: key,
            editorState,
            tag: '**',
            entityType: 'BOLD',
            targetRange
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
      case 'markdown-inline-autocomplete-sh-asterisk': {
        const content = editorState.getCurrentContent();
        const selection = editorState.getSelection();
        const anchorOffset = selection.getAnchorOffset();
        const focusOffset = selection.getFocusOffset();
        const offset = selection.getStartOffset();
        const key = selection.getStartKey();
        const pretext = content.getBlockForKey(key).getText().slice(0, offset);
        const protext = content.getBlockForKey(key).getText().slice(offset);
        const insertTagContent = Modifier.insertText(
          content,
          editorState.getSelection(),
          '*',
        );
        const newEditorState = EditorState.push(
          editorState,
          insertTagContent,
          'add-tag',
        );
        if (
          pretext !== '' &&
          pretext.match(/\*/g).length !== 1 &&
          pretext.match(/\*/g).length % 2 === 1 &&
          (protext === '' ||
          protext.match(/\*\*/g) &&
          !(protext.match(/\*\*/g).length % 2 === 2))
        ) {
          const currentWord = pretext.split('**').slice(-1)[0];
          const targetRange = new SelectionState({
            anchorOffset: anchorOffset - currentWord.length - 2,
            focusOffset: focusOffset + 1,
            anchorKey: key,
            focusKey: key
          });
          const newEditorStateAddedEntity = addEntity({
            blockKey: key,
            editorState: newEditorState,
            entityType: 'BOLD',
            targetRange
          });
          this.setState({
            editorState: newEditorStateAddedEntity
          });
          return true;
        }
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
      // TODO: handle jump to next line
      case 'markdown-inline-autocomplete-op-sh': {
        const selection = editorState.getSelection();
        const anchorOffset = selection.getAnchorOffset();
        const focusOffset = selection.getFocusOffset();
        const offset = anchorOffset === focusOffset ?
          selection.getStartOffset() : selection.getEndOffset();
        const key = selection.getStartKey();
        const content = editorState.getCurrentContent();
        const text = content.getBlockForKey(key).getText().slice(offset);
        const distance = distanceToMoveForwardToBd(text);
        const newEditorState = EditorState.set(editorState, { //eslint-disable-line
          selection: selection.merge({
            anchorKey: key,
            anchorOffset,
            focusKey: key,
            focusOffset: focusOffset + distance,
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
