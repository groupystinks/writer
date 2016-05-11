import findWithRegex from 'find-with-regex';

const COMMON_REGEX = '[\\w\\s\\u2000-\\u206F\\u2E00-\\u2E7F\\u4E00-\\u9FFF\\!"#\\$%&\\(\\)' +
  '\\*\\+,\\-\\.\\/:;<=>\\?@\\[\\]\\^_`\\{\\|\\}~\']*';

// block
const HEADER_ONE_REGEX = new RegExp('^#' + COMMON_REGEX, 'gm');
const HEADER_TWO_REGEX = new RegExp('^##' + COMMON_REGEX, 'gm');
const HEADER_THREE_REGEX = new RegExp('^###' + COMMON_REGEX, 'gm');
const HEADER_FOUR_REGEX = new RegExp('^####' + COMMON_REGEX, 'gm');
const HEADER_FIVE_REGEX = new RegExp('^#####' + COMMON_REGEX, 'gm');
const HEADER_SIX_REGEX = new RegExp('^######' + COMMON_REGEX, 'gm');
const BLOCK_QUOTE_REGEX = new RegExp('^>' + COMMON_REGEX, 'gm');

// inline
const BOLD_REGEX = new RegExp('\\*\\*' + COMMON_REGEX + '\\*\\*', 'g');

export function boldStrategy(contentBlock: Object, callback: Function) {
  findWithRegex(BOLD_REGEX, contentBlock, callback);
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
