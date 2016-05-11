import BlockComponent from './BlockComponent';
import InlineComponent from './InlineComponent';
import {
  blockQuoteStrategy,
  boldStrategy,
  headerOneStrategy,
  headerTwoStrategy,
  headerThreeStrategy,
  headerFourStrategy,
  headerFiveStrategy,
  headerSixStrategy,
} from './strategies/strategy';
import decorateComponentWithProps from 'decorate-component-with-props';

const styles = require('./styles.css');
const defaultTheme = {
  blockQuote: styles.blockQuote,
  bold: styles.bold,
  headerOne: styles.headerOne,
  headerTwo: styles.headerTwo,
  headerThree: styles.headerThree,
  headerFour: styles.headerFour,
  headerFive: styles.headerFive,
  headerSix: styles.headerSix,
};

const createMarkdownPlugin = (config = {}) => {
  const theme = config.theme ? config.theme : defaultTheme;
  return {
    decorators: [
      {
        strategy: headerSixStrategy,
        component: decorateComponentWithProps(BlockComponent, { theme, type: 'headerSix' }),
      },
      {
        strategy: headerFiveStrategy,
        component: decorateComponentWithProps(BlockComponent, { theme, type: 'headerFive' }),
      },
      {
        strategy: headerFourStrategy,
        component: decorateComponentWithProps(BlockComponent, { theme, type: 'headerFour' }),
      },
      {
        strategy: headerThreeStrategy,
        component: decorateComponentWithProps(BlockComponent, { theme, type: 'headerThree' }),
      },
      {
        strategy: headerTwoStrategy,
        component: decorateComponentWithProps(BlockComponent, { theme, type: 'headerTwo' }),
      },
      {
        strategy: headerOneStrategy,
        component: decorateComponentWithProps(BlockComponent, { theme, type: 'headerOne' }),
      },
      {
        strategy: blockQuoteStrategy,
        component: decorateComponentWithProps(BlockComponent, { theme, type: 'blockQuote' }),
      },
      {
        strategy: boldStrategy,
        component: decorateComponentWithProps(InlineComponent, { theme, type: 'bold' }),
      },
    ],
  };
};

export default createMarkdownPlugin;
