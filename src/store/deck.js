/* eslint-disable no-shadow */
import { decks } from './init';

export default function deck(store) {
  store.on('@init', () => ({ decks, filter: '' }));

  store.on('decks/create', ({ decks, filter }, { deck }) => ({
    filter,
    decks: [...decks, deck],
  }));

  store.on('decks/edit', ({ decks, filter }, { deck }) => {
    const index = decks.findIndex((item) => item.id === deck.id);
    const newDecks = [...decks];
    newDecks[index] = { ...deck };
    return {
      filter,
      decks: [...newDecks],
    };
  });

  store.on('decks/delete', ({ decks, filter }, { deletedDeck }) => {
    const newDecks = decks.filter((deck) => deletedDeck.id !== deck.id);
    return { filter, decks: [...newDecks] };
  });

  store.on('decks/pick', ({ modal }) => ({
    delModal: { ...modal, open: false, id: null, api: null, name: '' },
  }));

  store.on('decks/search', ({ modal }) => ({
    delModal: { ...modal, open: false, id: null, api: null, name: '' },
  }));

  store.on('filter/pick', ({ decks }, category) => ({
    decks,
    filter: category,
  }));

  store.on('filter/del', ({ decks }) => ({
    decks,
    filter: '',
  }));
}
