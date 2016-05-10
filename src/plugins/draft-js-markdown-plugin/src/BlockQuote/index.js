import React, { Component } from 'react';
import unionClassNames from 'union-class-names';

export default class HeaderOne extends Component { // eslint-disable-line
  render() {
    const { theme = {}, className, ...props } = this.props; // eslint-disable-line
    const combinedClassName = unionClassNames(theme.blockQuote, className);
    return (
      <blockquote { ...props } className={ combinedClassName } />
    );
  }
}
