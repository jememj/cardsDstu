import React from 'react';
import styled from 'styled-components';

import Items from './Items';

export default function Toolbar({
  title,
  count = 0,
  isEditor,
  setName,
  setColor,
  setCategory,
  name,
  color,
  category,
  saveDeck,
  delDeck,
}) {
  return (
    <Wrapper>
      <TitleWrapper>
        {isEditor ? (
          <StyledInput
            placeholder="Название колоды"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        ) : (
          <Title>{title}</Title>
        )}
        <Count isEditor={isEditor}>
          {isEditor ? (
            <input
              type="color"
              value={color}
              style={{ cursor: 'pointer' }}
              onChange={(e) => {
                setColor(e.target.value);
              }}
            />
          ) : (
            <>{count}</>
          )}
        </Count>
      </TitleWrapper>
      <Items
        isEditor={isEditor}
        category={category}
        setCategory={setCategory}
        saveDeck={saveDeck}
        delDeck={delDeck}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  padding: 20px 0;
  justify-content: space-between;
`;

const TitleWrapper = styled.div`
  display: flex;
`;

const Title = styled.h1`
  margin: 0;
  padding: 0 10px;
  margin-top: 7px;
`;

const Count = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: ${(props) => props.theme.colors.gray};
  ${(props) => (props.isEditor ? '' : 'margin-top: 10px;')}
`;

const StyledInput = styled.input`
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  max-width: 200px;
  max-height: 32px;
  color: ${(props) => props.theme.colors.text};
  background: ${(props) => props.theme.colors.cardBg};
  border: none;
  font-size: 20px;
  margin: 0 10px;
  margin-top: 7px;
  &:focus {
    outline: none;
  }
`;
