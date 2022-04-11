import { createStoreon } from 'storeon';

import cardsStore from './cards';
import deckStore from './deck';
import memoStore from './memo';
import themeStore from './theme';

const store = createStoreon([themeStore, memoStore, deckStore, cardsStore]);

export default store;
