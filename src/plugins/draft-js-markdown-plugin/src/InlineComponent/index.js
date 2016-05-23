import React, { Component, PropTypes } from 'react';
import unionClassNames from 'union-class-names';
import { BOLD_AUTO_COMPLETE_REGEX } from '../strategies/strategy';
import addTag from '../modifiers/addTag';

export default class InlineComponent extends Component { // eslint-disable-line
  state = {
    isAutoAppended: false
  }
  onClickHandler = () => {
    const { decoratedText, store, type } = this.props;
    if (type === 'boldAutoComplete' &&
        this.regex.BOLD_AUTO_COMPLETE_REGEX.test(decoratedText)
      ) {
      const newEditorState = addTag(
        store.getEditorState(),
        '**'
      );

      store.setEditorState(newEditorState);
      this.setState({ isAutoAppended: true });
    }
  }
  regex = {
    BOLD_AUTO_COMPLETE_REGEX
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
            onClick={ this.onClickHandler }
            className={ combinedClassName }
          />
        );
      default:
        return null;
    }
  }
}

InlineComponent.propTypes = {
  decoratedText: PropTypes.string,
  store: PropTypes.object,
  type: PropTypes.string,
};
