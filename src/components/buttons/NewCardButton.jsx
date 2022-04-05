import React from 'react';
import styled from 'styled-components';

export default function NewCardButton({ onClick }) {
  return <Wrapper onClick={onClick}>Новая карточка</Wrapper>;
}

const Wrapper = styled.button`
  padding: 48px 0;
  width: 100%;
  background: none;
  border: 1px solid #c7c7c7;
  border-radius: 8px;
  font-size: 16px;
  line-height: 16px;
  color: #c7c7c7;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.cardBg};
  }
`;
