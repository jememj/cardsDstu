/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useStoreon } from 'storeon/react';

import Editor from '../components/Editor';

export default function EditorDeck({ match }) {
  const { id } = match.params;
  const history = useHistory();

  const { dispatch, cardsByDeckId, currentDeckByDeckId } = useStoreon(
    'cardsByDeckId',
    'currentDeckByDeckId',
  );

  useEffect(() => {
    dispatch('decks/getCurrentDeckByDeckId', { deckId: id });
    dispatch('cards/getCardsByDeckId', { deckId: id });
  }, []);

  const [name, setName] = useState(currentDeckByDeckId?.title);
  const [color, setColor] = useState(currentDeckByDeckId?.background);
  const [category, setCategory] = useState(currentDeckByDeckId?.category);
  const [cards, setCards] = useState(() => cardsByDeckId);
  const [count, setCount] = useState(Array.from(Array(cardsByDeckId?.length).keys()));

  const [newCardsIds, setNewCardsIds] = useState({});
  const [updateCardsIds, setUpdateCardsIds] = useState({});

  useEffect(() => {
    setCards(cardsByDeckId);
    setName(currentDeckByDeckId?.title);
    setColor(currentDeckByDeckId?.background);
    setCategory(currentDeckByDeckId?.category);
    setCount(Array.from(Array(cardsByDeckId?.length).keys()));
  }, [cardsByDeckId]);

  if (!cards) {
    return <div>shrek</div>;
  }

  const handleCard = (pos, e, cardId) => {
    if (!newCardsIds[cardId]) {
      setUpdateCardsIds((prev) => ({ ...prev, [cardId]: true }));
    }
    const newCards = [...cards];
    const cardIndex = newCards.findIndex((card) => card.pos === pos);
    newCards[cardIndex][e.target.name] = e.target.value;
    setCards(newCards);
  };

  const deleteForm = (pos) => {
    const newForms = [...count].filter((i) => i !== pos);
    const newCards = [...cards].filter((i) => i.pos !== pos);
    setCount(newForms);
    setCards(newCards);
  };

  const saveDeck = () => {
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
      newCards: cards.filter((card) => updateCardsIds[card.id]),
    });
    dispatch('cards/create', {
      newCards: cards.filter((card) => newCardsIds[card.id]),
    });
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
      firstOpen={false}
      cards={cards}
      handleCard={handleCard}
      setNewCardsIds={setNewCardsIds}
      deckId={id}
    />
  );
}
