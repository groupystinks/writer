import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';
const { hasCommandModifier, isOptionKeyCommand } = KeyBindingUtil;

export default function KeyBinding(e) {
  if (e.keyCode === 39 /* right-arrow key */ && hasCommandModifier(e) /* cmd or ctrl */) {
    return 'markdown-inline-autocomplete-cm';
  } else if (e.keyCode === 39 /* right-arrow key */ && isOptionKeyCommand(e) /* option key */) {
    return 'markdown-inline-autocomplete-op';
  } else if (e.keyCode === 39 && e.shiftKey) {
    return 'markdown-inline-autocomplete-sh';
  } else if (e.keyCode === 39 /* right-arrow key */) {
    return 'markdown-inline-autocomplete';
  }
  return getDefaultKeyBinding(e);
}
