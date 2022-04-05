import cardsApi from '../service/cards';

export default function cardsStore(store) {
  store.on('@init', async () => {
    const cards = await cardsApi.getCards();
    console.log(cards.data);
    return { cards: cards.data };
  });

  store.on('cards/add', async ({ newCards }) => {
    await cardsApi.postNewCard(newCards);
    return { cards: cardsApi.getCards() };
  });

  store.on('cards/update', async ({ newCards }) => {
    await cardsApi.updateCards(newCards);
    return { cards: cardsApi.getCards() };
  });

  store.on('cards/delete', async ({ deletedCards }) => {
    await cardsApi.deleteCard(deletedCards);
    return { cards: cardsApi.getCards() };
  });
}
