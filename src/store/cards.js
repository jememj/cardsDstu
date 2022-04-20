import cardsApi from '../service/cardsService';

export default function cardsStore(store) {
  store.on('@init', async () => {
    const cards = await cardsApi.getCards();
    store.dispatch('cards/loaded', { cards: cards.data });
  });

  store.on('cards/loaded', (_, { cards }) => ({ cards, cardsById: [] }));

  store.on('cards/add', async (_, { newCards }) => {
    await cardsApi.postNewCards(newCards);
    return { cards: cardsApi.getCards() };
  });

  store.on('cards/update', async (_, { newCards }) => {
    console.log(
      'store',
      newCards.map((i) => i.id),
    );
    await cardsApi.updateCards(
      newCards,
      newCards.map((i) => i.id),
    );
    return { cards: cardsApi.getCards() };
  });

  store.on('cards/delete', async (_, { deletedCards }) => {
    await cardsApi.deleteCard(deletedCards);
    return { cards: cardsApi.getCards() };
  });

  store.on('cards/getCardsByDeckId', async (_, { deckId }) => {
    const cardsByDeckId = await cardsApi.cardsByDeckId(deckId);
    store.dispatch('cards/getCardsByDeckIdLoaded', { cardsByDeckId: cardsByDeckId.data });
  });
  store.on('cards/getCardsByDeckIdLoaded', (_, { cardsByDeckId }) => ({ cardsByDeckId }));

  store.on('cards/getCardByCardId', async (_, { cardId }) => {
    console.log('xxx', cardId);
    const cardByCardId = await cardsApi.getCardByCardId(cardId);
    store.dispatch('cards/cardsByIdLoaded', { cardByCardId: cardByCardId.data });
  });

  store.on('cards/cardsByIdLoaded', (_, { cardByCardId }) => ({ cardByCardId }));
}
