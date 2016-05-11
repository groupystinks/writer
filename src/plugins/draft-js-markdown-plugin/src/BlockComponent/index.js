import React, { Component } from 'react';
import unionClassNames from 'union-class-names';

export default class HeaderThree extends Component { // eslint-disable-line
  render() {
    const { theme = {}, type, className, ...props } = this.props; // eslint-disable-line
    const combinedClassName = unionClassNames(theme[type], className);
    switch (type) {
      case 'blockQuote':
        return (
          <blockquote { ...props } className={ combinedClassName } />
        );
      case 'bold':
        return (
          <strong { ...props } className={ combinedClassName } />
        );
      case 'headerOne':
        return (
          <h1 { ...props } className={ combinedClassName } />
        );
      case 'headerTwo':
        return (
          <h2 { ...props } className={ combinedClassName } />
        );
      case 'headerThree':
        return (
          <h3 { ...props } className={ combinedClassName } />
        );
      case 'headerFour':
        return (
          <h4 { ...props } className={ combinedClassName } />
        );
      case 'headerFive':
        return (
          <h5 { ...props } className={ combinedClassName } />
        );
      case 'headerSix':
        return (
          <h6 { ...props } className={ combinedClassName } />
        );
      default:
        return null;
    }
  }
}
