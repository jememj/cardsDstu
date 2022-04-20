/* eslint-disable import/extensions */
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useStoreon } from 'storeon/react';

import Editor from '../components/Editor';
import generateEmptyCard from '../utils/generateEmptyCard';
import generateRandomId from '../utils/generateRandomId';

export default function EditorDeck({ match }) {
  const { id } = match.params;
  const history = useHistory();
  const firstOpen = useRef(true);
  console.log('firstOpen');
  useEffect(() => {
    dispatch('decks/getCurrentDeck', { deckId: id });
    dispatch('cards/getCardsByDeck', { deckId: id });
  }, [id]);

  const { dispatch, cardsById, currentDeckById } = useStoreon('cardsById', 'currentDeckById');
  const [name, setName] = useState(() => currentDeckById?.title || '');
  const [color, setColor] = useState(() => currentDeckById?.background || '#45B071');
  const [category, setCategory] = useState(() => currentDeckById?.category || '');
  const [deckId] = useState(() => id || generateRandomId());

  const [count, setCount] = useState(() =>
    cardsById ? Array.from(Array(cardsById.length).keys()) : [0],
  );
  const [cards, setCards] = useState(() =>
    cardsById ? [...cardsById] : [generateEmptyCard(deckId, 0)],
  );

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
    if (id) {
      dispatch('decks/edit', {
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
      dispatch('cards/update', {
        newCards: cards,
      });
    } else {
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
      dispatch('cards/add', {
        newCards: cards,
      });
    }

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
      cards={cardsById}
      handleCard={handleCard}
    />
  );
}
