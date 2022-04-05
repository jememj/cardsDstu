import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';

import StyledButton from '../buttons/StyledButton';

export default function NewCardForm({ deleteForm, id, card, handleCard }) {
  return (
    <Wrapper>
      <InputWrapper>
        <StyledInput
          type="text"
          name="question"
          placeholder="Введите вопрос"
          value={card.question}
          onChange={(e) => {
            handleCard(id, e);
          }}
        />
      </InputWrapper>
      <InputWrapper>
        <StyledInput
          type="text"
          name="answer"
          placeholder="Введите ответ"
          value={card.answer}
          onChange={(e) => {
            handleCard(id, e);
          }}
        />
      </InputWrapper>
      <ButtonWrapper>
        <StyledButton
          title="Удалить"
          outline
          color="#FD371F"
          hoverColor="#FFF"
          hoverBackground="#FD371F"
          onClick={() => {
            deleteForm(id);
          }}
        />
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 16px;
  border-radius: 8px;
  background: #fff;
`;

const InputWrapper = styled.div`
  width: 100%;
  position: relative;
  background: ${(props) => props.theme.colors.cardBg};
`;

const StyledInput = styled(TextareaAutosize)`
  box-sizing: border-box;
  padding: 27px 20px;
  width: 100%;
  background: ${(props) => props.theme.colors.cardBg};
  border: none;
  border-bottom: 1px solid #c7c7c7;
  font-size: 16px;
  line-height: 16px;
  resize: none;
  font-family: sans-serif;
  color: ${(props) => props.theme.colors.text};
  &:focus {
    outline: none;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  background: ${(props) => props.theme.colors.cardBg};
`;
