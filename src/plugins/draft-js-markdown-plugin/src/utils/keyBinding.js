import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';
const { hasCommandModifier, isOptionKeyCommand } = KeyBindingUtil;

export default function KeyBinding(e) {
  if (e.keyCode === 39 && hasCommandModifier(e) && e.shiftKey) {
    return 'markdown-inline-autocomplete-cm-sh';
  } else if (e.keyCode === 39 && isOptionKeyCommand(e) && e.shiftKey) {
    return 'markdown-inline-autocomplete-op-sh';
  } else if (e.keyCode === 39 && isOptionKeyCommand(e)) {
    return 'markdown-inline-autocomplete-op';
  } else if (e.keyCode === 39 && e.shiftKey) {
    return 'markdown-inline-autocomplete-sh';
  } else if (e.keyCode === 56 && e.shiftKey /* literal `*` */) {
    return 'markdown-inline-autocomplete-sh-asterisk';
  } else if (e.keyCode === 39 && hasCommandModifier(e) /* cmd or ctrl */) {
    return 'markdown-inline-autocomplete-cm';
  } else if (e.keyCode === 39 /* right-arrow key */) {
    return 'markdown-inline-autocomplete';
  }
  return getDefaultKeyBinding(e);
}
