import cardsApi from '../service/cards';

export default function cardsStore(store) {
  store.on('@init', async () => {
    const cards = await cardsApi.getCards();
    store.dispatch('cards/loaded', { cards: cards.data });
  });

  store.on('cards/loaded', (_, { cards }) => ({ cards, cardsById: [] }));

  store.on('cards/add', async (_, { newCards }) => {
    await cardsApi.postNewCard(newCards);
    return { cards: cardsApi.getCards() };
  });

  store.on('cards/update', async (_, { newCards }) => {
    await cardsApi.updateCards({ newCards });
    return { cards: cardsApi.getCards() };
  });

  store.on('cards/delete', async (_, { deletedCards }) => {
    console.log(deletedCards);
    // await cardsApi.deleteCard(deletedCards);
    return { cards: cardsApi.getCards() };
  });
  store.on('cards/getCardsByDeck', async (_, { cardId }) => {
    const cardsByIdResponse = await cardsApi.getCardsByDeck(cardId);
    store.dispatch('cards/cardsByIdLoaded', { cardsById: cardsByIdResponse.data });
  });

  store.on('cards/cardsByIdLoaded', (_, { cardsById }) => ({ cardsById }));
}
