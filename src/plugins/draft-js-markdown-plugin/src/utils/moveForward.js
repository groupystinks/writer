const WORD_BOUDARY_REGEX = /(:?^\s*[*\s!"#$%&()+,-./:;<=>?@\[\]^_`{|}~]*\w*)/;

export function distanceToMoveForwardToBd(text) {
  const match = WORD_BOUDARY_REGEX.exec(text)[1] || '';
  return match.length;
}
