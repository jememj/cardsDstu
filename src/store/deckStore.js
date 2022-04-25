/* eslint-disable no-shadow */
import decksApi from '../service/decksService';

export default function deck(store) {
  store.on('@init', async () => {
    store.dispatch('decks/getDecks');
  });

  store.on('decks/getDecks', async () => {
    const decks = await decksApi.getDecks();
    store.dispatch('decks/loaded', { decks: decks.data, filter: '' });
  });

  store.on('decks/loaded', (_, { decks }) => ({ decks }));

  store.on('decks/deckClear', (_) => ({ currentDeckByDeckId: {} }));

  store.on('decks/getCurrentDeckByDeckId', async (_, { deckId }) => {
    const currentDeckByDeckId = await decksApi.getCurrentDeck(deckId);
    store.dispatch('cards/getCurrentDeckByDeckIdLoaded', {
      currentDeckByDeckId: currentDeckByDeckId.data,
    });
  });
  store.on('cards/getCurrentDeckByDeckIdLoaded', (_, { currentDeckByDeckId }) => ({
    currentDeckByDeckId,
  }));

  store.on('decks/create', async (_, { deck }) => {
    await decksApi.postNewDeck([deck]);
  });

  store.on('decks/update', async (_, { deck }) => {
    await decksApi.updateDeck(deck);
  });

  store.on('decks/delete', async (_, { deletedDeck }) => {
    await decksApi.deleteDeck(deletedDeck.id);
  });

  store.on('filter/pick', ({ decks }, category) => ({
    decks,
    filter: category,
  }));

  store.on('filter/del', ({ decks }) => ({
    decks,
    filter: '',
  }));
}
