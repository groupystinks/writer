import { Entity } from 'draft-js';
import findWithRegex from 'find-with-regex';

const COMMON_REGEX = '[\\w\\s\\u2000-\\u206F\\u2E00-\\u2E7F\\u4E00-\\u9FFF\\!"#\\$%&\\(\\)' +
  '\\*\\+,\\-\\.\\/:;<=>\\?@\\[\\]\\^_`\\{\\|\\}~\']*';
// '*', '_' is excluded
const MARKDOWN_INLINE_REGEX = '[A-Za-z0-9\\s\\!"#\\$%&\\(\\)' +
  '\\+,\\-\\.\\/:;<=>\\?@\\^`\\{\\|\\}~\']*';

// block
export const HEADER_ONE_REGEX = new RegExp(`^#${COMMON_REGEX}`, 'gm');
export const HEADER_TWO_REGEX = new RegExp(`^##${COMMON_REGEX}`, 'gm');
export const HEADER_THREE_REGEX = new RegExp('^###' + COMMON_REGEX, 'gm');
export const HEADER_FOUR_REGEX = new RegExp('^####' + COMMON_REGEX, 'gm');
export const HEADER_FIVE_REGEX = new RegExp('^#####' + COMMON_REGEX, 'gm');
export const HEADER_SIX_REGEX = new RegExp('^######' + COMMON_REGEX, 'gm');
export const BLOCK_QUOTE_REGEX = new RegExp('^>' + COMMON_REGEX, 'gm');

// inline
export const BOLD_AUTO_COMPLETE_REGEX = new RegExp(`\\*\\*${MARKDOWN_INLINE_REGEX}`, 'gm');
export const BOLD_REGEX = new RegExp(`\\*\\*${MARKDOWN_INLINE_REGEX}\\*\\*`, 'gm');
export const ITALIC_AUTO_COMPLETE_REGEX = new RegExp(`\\_${MARKDOWN_INLINE_REGEX}`, 'gm');
export const ITALIC_REGEX = new RegExp(`\\_${MARKDOWN_INLINE_REGEX}\\_`, 'gm');

export function boldAutoCompleteStrategy(contentBlock: Object, callback: Function) {
  findWithRegex(BOLD_AUTO_COMPLETE_REGEX, contentBlock, callback);
}

export function boldStrategy(contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        Entity.get(entityKey).getType() === 'BOLD'
      );
    },
    callback
  );
}

export function italicAutoCompleteStrategy(contentBlock: Object, callback: Function) {
  findWithRegex(ITALIC_AUTO_COMPLETE_REGEX, contentBlock, callback);
}

export function italicStrategy(contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        Entity.get(entityKey).getType() === 'ITALIC'
      );
    },
    callback
  );
}

export function headerOneStrategy(contentBlock: Object, callback: Function) {
  findWithRegex(HEADER_ONE_REGEX, contentBlock, callback);
}

export function headerTwoStrategy(contentBlock: Object, callback: Function) {
  findWithRegex(HEADER_TWO_REGEX, contentBlock, callback);
}

export function headerThreeStrategy(contentBlock: Object, callback: Function) {
  findWithRegex(HEADER_THREE_REGEX, contentBlock, callback);
}

export function headerFourStrategy(contentBlock: Object, callback: Function) {
  findWithRegex(HEADER_FOUR_REGEX, contentBlock, callback);
}

export function headerFiveStrategy(contentBlock: Object, callback: Function) {
  findWithRegex(HEADER_FIVE_REGEX, contentBlock, callback);
}

export function headerSixStrategy(contentBlock: Object, callback: Function) {
  findWithRegex(HEADER_SIX_REGEX, contentBlock, callback);
}

export function blockQuoteStrategy(contentBlock: Object, callback: Function) {
  findWithRegex(BLOCK_QUOTE_REGEX, contentBlock, callback);
}
