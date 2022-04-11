import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useStoreon } from 'storeon/react';
import styled from 'styled-components';

import DeckCard from '../components/cards/DeckCard';
import ToolBar from '../components/toolbar/Toolbar';

export default function Deck({ match }) {
  const { id } = match.params;
  const history = useHistory();
  const { dispatch, cardsById, currentDeckById } = useStoreon('cardsById', 'currentDeckById');

  useEffect(() => {
    dispatch('cards/getCurrentDeck', { deckId: id });
    dispatch('cards/getCardsByDeck', { deckId: id });
  }, []);

  if (!cardsById?.length || !currentDeckById) {
    return <div>shrek</div>;
  }
  const { title, cardsCount } = currentDeckById;

  const delDeck = () => {
    dispatch('decks/delete', { deletedDeck: currentDeckById });
    dispatch('cards/delete', {
      deletedCards: cardsById,
    });
    history.push('/decks');
  };

  return (
    <Wrapper>
      <ToolBar title={title} count={cardsCount} delDeck={delDeck} />
      <Grid isCentered>
        {cardsById.map(({ question, id: cardId }) => (
          <StyledLink to={`/memo/single/${cardId}`} key={cardId}>
            <DeckCard content={question} id={cardId} />
          </StyledLink>
        ))}
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 95vw;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  max-width: 300px;
  width: 100%;
`;
const Grid = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 40px 0;

  ${(props) =>
    props.isCentered
      ? `max-width: 1248px;
         margin: 0 auto;
         @media (max-width: 1315px) {
            max-width: 940px;
         }`
      : ''}
`;
