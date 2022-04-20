export default function memoStore(store) {
  store.on('@init', () => ({ session: {} }));

  store.on('memo/start', (_, { deck }) => ({
    session: { ...deck, deck: [...deck.deck].sort(() => Math.random() - 0.5), status: 'start' },
  }));

  store.on('memo/next', ({ session }) => {
    const sessionDeck = [...session.deck];
    const CURRENT_CARD_INDEX = 0;
    sessionDeck.splice(sessionDeck.length, 0, sessionDeck.splice(CURRENT_CARD_INDEX, 1)[0]);
    return {
      session: { ...session, deck: sessionDeck },
    };
  });
}
