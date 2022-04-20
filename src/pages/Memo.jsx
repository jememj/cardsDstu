import React, { useMemo, useEffect, useState } from 'react';
import { useStoreon } from 'storeon/react';
import styled from 'styled-components';

import Card from '../components/cards/Card';
import Button from '../components/memo/Button';
import Tooltip from '../components/memo/Tooltip';

export default function Memo({ match }) {
  const {
    dispatch,
    decks,
    session,
    cards,
    cardByCardId,
    cardsByDeckId,
    currentDeckByDeckId,
  } = useStoreon(
    'decks',
    'session',
    'cards',
    'cardByCardId',
    'cardsByDeckId',
    'currentDeckByDeckId',
  );
  const { mode = 'deck', id } = match.params;
  const [currentDeck, setCurrentDeck] = useState([]);
  const [count, setCount] = useState(1);

  const deck = useMemo(
    () => ({
      ...currentDeckByDeckId,
      deck: cardsByDeckId,
    }),
    [],
  );

  const next = (answer) => {
    dispatch('memo/next', { answer });
    setCount((prev) => prev + 1);
  };

  useEffect(() => {
    dispatch('memo/start', { deck });
  }, []);

  useEffect(() => {
    setCurrentDeck(session.deck);
  }, [session.deck]);

  useEffect(() => {
    dispatch('cards/getCardByCardId', { cardId: id });
    dispatch('cards/getCardsByDeckId', { deckId: id });
    dispatch('decks/getCurrentDeckByDeckId', { deckId: id });
  }, []);

  if (mode === 'single') {
    if (!cardByCardId) {
      return null;
    }

    return (
      <Wrapper>
        <Card data={cardByCardId} />
        <Tooltip count={count} mode={mode} />
        {mode === 'deck' && <Button next={next} />}
      </Wrapper>
    );
  }

  if (!currentDeck?.length) {
    return <div>shrek</div>;
  }

  return (
    <Wrapper>
      <CountWrapper>{count}</CountWrapper>
      <Card data={currentDeck[0]} />
      <Tooltip count={count} mode={mode} />
      {mode === 'deck' && <Button next={next} />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 932px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`;
const CountWrapper = styled.div`
  display: flex;
  width: 100%;
  color: #c7c7c7;
  justify-content: end;
  margin-right: 40px;
`;
