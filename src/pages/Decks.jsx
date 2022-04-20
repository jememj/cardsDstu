import React, { useEffect } from 'react';
import { useStoreon } from 'storeon/react';
import styled from 'styled-components';

import Deck from '../components/cards/Deck';
import Filters from '../components/toolbar/Filters';

export default function Decks() {
  const { decks } = useStoreon('decks');

  const { dispatch, filter } = useStoreon('filter');

  const filteredDecks = filter ? decks.filter((deck) => deck.category === filter) : decks;

  useEffect(
    () => () => {
      dispatch('filter/del');
    },
    [],
  );

  if (!filteredDecks?.length) {
    return <div>shrek</div>;
  }

  return (
    <Wrapper>
      <Filters />
      <Grid>
        {filteredDecks.map(({ id, title, background, color, cardsCount }) => (
          <Deck
            key={id}
            id={id}
            title={title}
            description={cardsCount}
            background={background}
            color={color}
          />
        ))}
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-top: 40px;
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
