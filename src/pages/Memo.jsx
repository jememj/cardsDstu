import React, { useMemo, useEffect, useState } from 'react';
import { useStoreon } from 'storeon/react';
import styled from 'styled-components';

import Card from '../components/cards/Card';
import Button from '../components/memo/Button';
import Tooltip from '../components/memo/Tooltip';

export default function Memo({ match }) {
  const { dispatch, decks, session, cards } = useStoreon('decks', 'session', 'cards');
  const { mode = 'deck', id } = match.params;
  const [currentDeck, setCurrentDeck] = useState([]);
  const [count, setCount] = useState(1);

  const deck = useMemo(
    () => ({
      ...decks.find((i) => i.id === id),
      deck: cards.filter((card) => card.deckId === id),
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

  if (mode === 'single') {
    return (
      <Wrapper>
        <Card data={cards.find((card) => card.id === id)} />
        <Tooltip count={count} mode={mode} />
        {mode === 'deck' && <Button next={next} />}
      </Wrapper>
    );
  }

  if (!currentDeck || !currentDeck.length || !currentDeck[0]) {
    return null;
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
