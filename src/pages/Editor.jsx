import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useStoreon } from 'storeon/react';
import styled from 'styled-components';

import NewCardButton from '../components/buttons/NewCardButton';
import NewCardForm from '../components/forms/NewCardForm';
import Toolbar from '../components/toolbar/Toolbar';
import generateEmptyCard from '../utils/generateEmptyCard';

export default function Editor({ match }) {
  const { id } = match.params;
  const { dispatch, decks, cards: storeCards } = useStoreon('decks', 'cards');
  const history = useHistory();
  const firstOpen = useRef(true);

  const currentDeck = id ? decks.find((deck) => deck.id === id) : null;
  const currentCards = id ? storeCards.filter((card) => card.deckId === id) : null;
  // useEffect(() => {
  //   dispatch('cards/getCardsByDeck', { deckId: id });
  // }, []);
  const [name, setName] = useState(() => currentDeck?.title || '');
  const [color, setColor] = useState(() => currentDeck?.background || '#45B071');
  const [category, setCategory] = useState(() => currentDeck?.category || '');

  const [count, setCount] = useState(() =>
    currentCards ? Array.from(Array(currentCards.length).keys()) : [0],
  );
  const [cards, setCards] = useState(() =>
    currentCards ? [...currentCards] : [generateEmptyCard(0)],
  );

  const [deletedCards, setDeletedCards] = useState(() => []);

  const handleCard = (pos, e) => {
    firstOpen.current = false;
    const newCards = [...cards];
    const cardIndex = newCards.findIndex((card) => card.pos === pos);
    newCards[cardIndex][e.target.name] = e.target.value;
    setCards(newCards);
  };

  const deleteForm = (pos) => {
    firstOpen.current = false;
    const newForms = [...count].filter((i) => i !== pos);
    const newCards = [...cards].filter((i) => i.pos !== pos);
    setCount(newForms);
    setCards(newCards);

    setDeletedCards((prev) => [...prev, [...cards].filter((i) => i.pos === pos)]);
  };

  const saveDeck = () => {
    if (currentDeck) {
      dispatch('decks/edit', {
        deck: {
          id,
          background: color,
          color: '#FCFCFC',
          title: name,
          category,
          prtivate: true,
          cardsCount: count.length,
          author: 1,
        },
      });
      dispatch('cards/update', {
        newCards: cards,
      });
    } else {
      dispatch('decks/create', {
        deck: {
          background: color,
          color: '#FCFCFC',
          title: name,
          category,
          prtivate: true,
          cardsCount: count.length,
          author: 1,
        },
      });
      dispatch('cards/add', {
        newCards: cards,
      });
    }

    setTimeout(() => {
      history.push('/decks');
    }, 350);
  };

  const delDeck = () => {
    if (currentDeck) {
      dispatch('decks/delete', { deletedDeck: currentDeck });
      dispatch('cards/delete', {
        deletedCards: cards,
      });
    }

    setTimeout(() => {
      history.push('/decks');
    }, 350);
  };

  useEffect(() => {
    console.log(deletedCards);
    dispatch('cards/delete', { deletedCards });
  }, [deletedCards]);

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
          setCards([...cards, generateEmptyCard(pos)]);
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
