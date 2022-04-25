import { createStoreon } from 'storeon';

import cardsStore from './cardsStore';
import deckStore from './deckStore';
import memoStore from './memoStore';
import themeStore from './themeStore';

const store = createStoreon([themeStore, memoStore, deckStore, cardsStore]);

export default store;
