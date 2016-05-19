import BlockComponent from './BlockComponent';
import InlineComponent from './InlineComponent';
import {
  blockQuoteStrategy,
  boldStrategy,
  boldAutoCompleteStrategy,
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
  boldAutoComplete: styles.boldAutoComplete,
  headerOne: styles.headerOne,
  headerTwo: styles.headerTwo,
  headerThree: styles.headerThree,
  headerFour: styles.headerFour,
  headerFive: styles.headerFive,
  headerSix: styles.headerSix,
};

const createMarkdownPlugin = (config = {}) => {
  const theme = config.theme ? config.theme : defaultTheme;
  const store = {
    getEditorState: undefined,
    setEditorState: undefined,
  };
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
        component: decorateComponentWithProps(InlineComponent,
          {
            store,
            theme,
            type: 'bold'
          }
        ),
      },
      {
        strategy: boldAutoCompleteStrategy,
        component: decorateComponentWithProps(InlineComponent,
          {
            store,
            theme,
            type: 'boldAutoComplete'
          }
        ),
      },
    ],
    initialize: ({ getEditorState, setEditorState }) => {
      store.getEditorState = getEditorState;
      store.setEditorState = setEditorState;
    },
  };
};

export default createMarkdownPlugin;
