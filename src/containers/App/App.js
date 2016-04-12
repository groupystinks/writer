import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadGroup } from 'redux/modules/word';

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
    const { loadGroup } = this.props; // eslint-disable-line
    loadGroup();
  }
  render() {
    return (
      <div>
        <div>
          HiHi
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}