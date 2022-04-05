import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Deck({ background = '#6FCF97', color = 'black', title, description, id }) {
  return (
    <Wrapper style={{ background }} to={`decks/${id}`}>
      <Title style={{ color }}>{title}</Title>
      <Description>{description}</Description>
    </Wrapper>
  );
}

const Wrapper = styled(Link)`
  box-sizing: border-box;
  width: 100%;
  max-width: 300px;
  max-height: 170px;
  padding: 20px 50px 80px 20px;
  border-radius: 4px;
  word-wrap: break-word;
  text-decoration: none;
`;

const Title = styled.h2`
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 20px;
`;

const Description = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 14px;
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.5);
  max-width: 70px;
`;
