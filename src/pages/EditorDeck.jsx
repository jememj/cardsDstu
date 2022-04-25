/* eslint-disable import/extensions */
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useStoreon } from 'storeon/react';

import Editor from '../components/Editor';
import generateEmptyCard from '../utils/generateEmptyCard';

export default function EditorDeck({ match }) {
  const { id } = match.params;
  const history = useHistory();
  const firstOpen = useRef(true);

  useEffect(() => {
    dispatch('decks/getCurrentDeck', { deckId: id });
    dispatch('cards/getCardsByDeck', { deckId: id });
  }, [id]);

  const { dispatch, cardsByDeckId, currentDeckByDeckId } = useStoreon(
    'cardsByDeckId',
    'currentDeckByDeckId',
  );
  const [name, setName] = useState(() => currentDeckByDeckId?.title);
  const [color, setColor] = useState(() => currentDeckByDeckId?.background);
  const [category, setCategory] = useState(() => currentDeckByDeckId?.category);

  const [count, setCount] = useState(() =>
    cardsByDeckId ? Array.from(Array(cardsByDeckId.length).keys()) : [0],
  );
  const [cards, setCards] = useState(() =>
    cardsByDeckId ? [...cardsByDeckId] : [generateEmptyCard(id, 0)],
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
      dispatch('decks/update', {
        deck: {
          id,
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
    }
    setTimeout(() => {
      history.push('/decks');
    }, 350);
  };

  const delDeck = () => {
    if (currentDeckByDeckId) {
      dispatch('decks/delete', { deletedDeck: currentDeckByDeckId });
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
      deleteForm={deleteForm}
      firstOpen={firstOpen}
      cards={cards}
      handleCard={handleCard}
    />
  );
}
