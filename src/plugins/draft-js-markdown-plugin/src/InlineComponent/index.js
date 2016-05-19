import React, { Component, PropTypes } from 'react';
import unionClassNames from 'union-class-names';
import { BOLD_AUTO_COMPLETE_REGEX } from '../strategies/strategy';
import addTag from '../modifiers/addTag';

export default class InlineComponent extends Component { // eslint-disable-line
  state = {
    isAutoAppended: false
  }
  componentWillUpdate(nextProps) {
    this.autoAppendHandler(nextProps);
    console.log(nextProps);
  }
  regex = {
    BOLD_AUTO_COMPLETE_REGEX
  }
  autoAppendHandler = (nextProps) => {
    const { store, type } = this.props;
    const { isAutoAppended } = this.state;
    console.log('isAutoAppended', isAutoAppended);
    console.log('type', type);
    // if (!isAutoAppended &&
    //     type === 'boldAutoComplete' &&
    //     this.regex.BOLD_AUTO_COMPLETE_REGEX.test(nextProps.decoratedText)
    //   ) {
    //   console.log('auto!!!');
    //   const newEditorState = addTag(
    //     store.getEditorState(),
    //     '**'
    //   );
    //
    //   store.setEditorState(newEditorState);
    //   this.setState({ isAutoAppended: true });
    // }
  }
  render() {
    const { theme = {}, type, className, ...props } = this.props; // eslint-disable-line
    const combinedClassName = unionClassNames(theme[type], className);
    switch (type) {
      case 'bold':
        return (
          <strong
            { ...props }
            className={ combinedClassName }
          />
        );
      case 'boldAutoComplete':
        return (
          <strong
            { ...props }
            className={ combinedClassName }
          />
        );
      default:
        return null;
    }
  }
}

InlineComponent.propTypes = {
  store: PropTypes.object,
};
