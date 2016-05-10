import BlockQuote from './BlockQuote';
import HeaderOne from './HeaderOne';
import HeaderTwo from './HeaderTwo';
import { blockQuoteStrategy, headerOneStrategy, headerTwoStrategy } from './strategies/strategy';
import decorateComponentWithProps from 'decorate-component-with-props';

const styles = require('./styles.css');
const defaultTheme = {
  blockQuote: styles.blockQuote,
  headerOne: styles.headerOne,
  headerTwo: styles.headerTwo,
};

const createMarkdownPlugin = (config = {}) => {
  const theme = config.theme ? config.theme : defaultTheme;
  return {
    decorators: [
      {
        strategy: headerTwoStrategy,
        component: decorateComponentWithProps(HeaderTwo, { theme }),
      },
      {
        strategy: headerOneStrategy,
        component: decorateComponentWithProps(HeaderOne, { theme }),
      },
      {
        strategy: blockQuoteStrategy,
        component: decorateComponentWithProps(BlockQuote, { theme }),
      },
    ],
  };
};

export default createMarkdownPlugin;
