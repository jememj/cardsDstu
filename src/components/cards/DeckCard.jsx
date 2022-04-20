import React from 'react';
import styled from 'styled-components';

export default function DeckCard({ question }) {
  return (
    <Wrapper>
      <Description>{question}</Description>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  max-width: 300px;
  max-height: 170px;
  padding: 10px;
  border-radius: 4px;
  word-wrap: break-word;
  padding: 75px 10px;
  background: ${(props) => props.theme.colors.cardBg};
  color: ${(props) => props.theme.colors.text};

  &:hover {
    background: ${(props) => props.theme.colors.cardBgHover};
  }
`;

const Description = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 20px;
`;
