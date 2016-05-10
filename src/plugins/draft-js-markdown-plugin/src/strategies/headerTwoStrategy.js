import findWithRegex from 'find-with-regex';

const HASHTAG_REGEX = /##[\w\u0590-\u05ff\u4E00-\u9FFF\s;@.]+/g;

export default (contentBlock: Object, callback: Function) => {
  findWithRegex(HASHTAG_REGEX, contentBlock, callback);
};
