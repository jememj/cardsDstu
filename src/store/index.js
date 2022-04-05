import { createStoreon } from 'storeon';

import { persistState } from '@storeon/localstorage';

import cardsStore from './cards';
import deckStore from './deck';
import memoStore from './memo';
import themeStore from './theme';

const store = createStoreon([
  themeStore,
  memoStore,
  deckStore,
  cardsStore,
  persistState(['theme', 'cards', 'decks']),
]);

export default store;