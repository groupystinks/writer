import React, { Component, PropTypes } from 'react';
import MarkdownEditor from './components/MarkdownEditor/MarkdownEditor';
import './App.css';

export default class App extends Component { // eslint-disable-line
  static propTypes = {
    children: PropTypes.object.isRequired
  }
  render() {
    return (
      <div>
        <div>
          <MarkdownEditor />
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
