/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useStoreon } from 'storeon/react';

import Editor from '../components/Editor';
import generateEmptyCard from '../utils/generateEmptyCard';
import generateRandomId from '../utils/generateRandomId';

export default function NewEditor() {
  const history = useHistory();
  const firstOpen = useRef(true);

  const { dispatch, currentDeckById } = useStoreon('cardsById', 'currentDeckById');
  const [name, setName] = useState(() => '');
  const [color, setColor] = useState(() => '#45B071');
  const [category, setCategory] = useState(() => '');
  const [deckId] = useState(() => generateRandomId());

  const [count, setCount] = useState(() => [0]);
  const [cards, setCards] = useState(() => [generateEmptyCard(deckId, 0)]);

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
  };
  const saveDeck = () => {
    dispatch('decks/create', {
      deck: {
        id: deckId,
        background: color,
        color: '#FCFCFC',
        title: name,
        category,
        prtivate: true,
        cardsCount: count.length,
      },
    });
    dispatch('cards/create', {
      newCards: cards,
    });

    setTimeout(() => {
      history.push('/decks');
    }, 350);
  };

  const delDeck = () => {
    if (currentDeckById) {
      dispatch('decks/delete', { deletedDeck: currentDeckById });
      dispatch('cards/delete', {
        deletedCards: cards,
      });
    }

    setTimeout(() => {
      history.push('/decks');
    }, 350);
  };

  return (
    <Editor
      isEditor
      name={name}
      color={color}
      category={category}
      setName={setName}
      setColor={setColor}
      setCategory={setCategory}
      saveDeck={saveDeck}
      delDeck={delDeck}
      setCount={setCount}
      setCards={setCards}
      count={count}
      deckId={deckId}
      deleteForm={deleteForm}
      firstOpen={firstOpen}
      cards={cards}
      handleCard={handleCard}
    />
  );
}
