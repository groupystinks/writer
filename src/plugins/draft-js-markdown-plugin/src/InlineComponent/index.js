import React, { Component } from 'react';
import unionClassNames from 'union-class-names';

export default class HeaderThree extends Component { // eslint-disable-line
  render() {
    const { theme = {}, type, className, ...props } = this.props; // eslint-disable-line
    const combinedClassName = unionClassNames(theme[type], className);
    switch (type) {
      case 'bold':
        return (
          <strong { ...props } className={ combinedClassName } />
        );
      default:
        return null;
    }
  }
}
