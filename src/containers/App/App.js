import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadGroup } from 'redux/modules/word';
// import RichEditor from '../RichEditor/RichEditor';
import MarkdownEditor from '../MarkdownEditor/MarkdownEditor';

@connect(
  state => ({
    groups: state.word.groups,
  }),
  dispatch => bindActionCreators({
    loadGroup
  }, dispatch)
)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };
  componentWillMount() {
    // const { loadGroup } = this.props; // eslint-disable-line
    // loadGroup();
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
