import findWithRegex from 'find-with-regex';

const COMMON_REGEX = '[\\w\\s\\u2000-\\u206F\\u2E00-\\u2E7F\\!"#\\$%&\\(\\)' +
  '\\*\\+,\\-\\.\\/:;<=>\\?@\\[\\]\\^_`\\{\\|\\}~\']+';

const HEADER_ONE_REGEX = new RegExp('^#' + COMMON_REGEX, 'gm');
const HEADER_TWO_REGEX = new RegExp('^##' + COMMON_REGEX, 'gm');
const BLOCK_QUOTE_REGEX = new RegExp('^>' + COMMON_REGEX, 'gm');

export function headerOneStrategy(contentBlock: Object, callback: Function) {
  findWithRegex(HEADER_ONE_REGEX, contentBlock, callback);
}

export function headerTwoStrategy(contentBlock: Object, callback: Function) {
  findWithRegex(HEADER_TWO_REGEX, contentBlock, callback);
}

export function blockQuoteStrategy(contentBlock: Object, callback: Function) {
  findWithRegex(BLOCK_QUOTE_REGEX, contentBlock, callback);
}
