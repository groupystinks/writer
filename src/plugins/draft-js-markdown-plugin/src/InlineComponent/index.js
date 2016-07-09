import React, { Component, PropTypes } from 'react';
import unionClassNames from 'union-class-names';

export default class InlineComponent extends Component { // eslint-disable-line
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
      case 'italic':
        return (
          <i
            { ...props }
            className={ combinedClassName }
          />
        );
      case 'italicAutoComplete':
        return (
          <i
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
  decoratedText: PropTypes.string,
  store: PropTypes.object,
  type: PropTypes.string,
};
