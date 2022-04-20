import React from 'react';
import styled from 'styled-components';

import generateEmptyCard from '../utils/generateEmptyCard';
import NewCardButton from './buttons/NewCardButton';
import NewCardForm from './forms/NewCardForm';
import Toolbar from './toolbar/Toolbar';

export default function Editor({
  name,
  color,
  category,
  setName,
  setColor,
  setCategory,
  saveDeck,
  delDeck,
  setCount,
  setCards,
  count,
  deckId,
  deleteForm,
  firstOpen,
  cards,
  handleCard,
}) {
  return (
    <Wrapper>
      <Toolbar
        isEditor
        name={name}
        color={color}
        category={category}
        setName={setName}
        setColor={setColor}
        setCategory={setCategory}
        saveDeck={saveDeck}
        delDeck={delDeck}
      />
      <NewCardButton
        onClick={() => {
          const pos = count[count.length - 1] + 1 || 0;
          setCount([...count, pos]);
          setCards([...cards, generateEmptyCard(deckId, pos)]);
        }}
      />
      <FlexWrap>
        {count.map((i) => (
          <NewCardForm
            key={i}
            id={i}
            deleteForm={deleteForm}
            card={firstOpen.current ? cards[i] : cards.find((card) => card.pos === i)}
            handleCard={handleCard}
          />
        ))}
      </FlexWrap>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding-top: 40px;
`;

const FlexWrap = styled.div`
  display: flex;
  flex-direction: column-reverse;
  padding-bottom: 10px;
`;
