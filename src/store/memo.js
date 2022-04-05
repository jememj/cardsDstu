export default function memoStore(store) {
  store.on('@init', () => ({ progress: {}, session: {} }));

  store.on('memo/start', ({ progress }, { deck }) => ({
    progress,
    session: { ...deck, deck: [...deck.deck].sort(() => Math.random() - 0.5), status: 'start' },
  }));

  store.on('memo/next', ({ session }, { answer }) => {
    const sessionDeck = [...session.deck];
    const CURRENT_CARD_INDEX = 0;

    if (answer === 'next') {
      const middleOfArray = ~~(sessionDeck.length / 2);
      sessionDeck.splice(middleOfArray, 0, sessionDeck.splice(CURRENT_CARD_INDEX, 1)[0]);
    }
    return {
      session: { ...session, deck: sessionDeck },
    };
  });
}
