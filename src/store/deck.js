/* eslint-disable no-shadow */
import decksApi from '../service/decks';

export default function deck(store) {
  store.on('@init', async () => {
    const decks = await decksApi.getDecks();
    console.log(decks.data);
    store.dispatch('decks/loaded', { decks: decks.data, filter: '' });
  });
  store.on('decks/loaded', (_, { decks }) => ({ decks }));

  store.on('cards/getCurrentDeck', async (_, { deckId }) => {
    const currentDeckResponse = await decksApi.getCurrentDeck(deckId);
    store.dispatch('cards/getCurrentDeckLoaded', { currentDeckById: currentDeckResponse.data });
  });

  store.on('cards/getCurrentDeckLoaded', (_, { currentDeckById }) => ({ currentDeckById }));

  // store.on('decks/create', async (_, { newDeck }) => {
  //   await decksApi.postNewDeck(newDeck);
  //   return { cards: decksApi.getDecks() };
  // });

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
