import React, { useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useStoreon } from 'storeon/react';
import styled from 'styled-components';

import filters from '../../constants/filters';
import StyledButton from '../buttons/StyledButton';

export default function Items({ isEditor, category, setCategory, saveDeck, delDeck }) {
  const { id } = useParams();
  const history = useHistory();
  const { theme } = useStoreon('theme');
  const [confirmDel, setConfirmDel] = useState(false);

  return (
    <Wrapper isEditor={isEditor}>
      <StyledButton
        title={isEditor ? 'Сохранить' : 'Запустить'}
        color="#fff"
        background="#45B071"
        hoverBackground="#6AC08D !important"
        onClick={
          isEditor
            ? saveDeck
            : () => {
                history.push(`/memo/deck/${id}`);
              }
        }
      />
      {isEditor ? (
        <Select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          <option disabled value="">
            Категория
          </option>
          {filters.map(({ category: value, title }) => (
            <option value={value} key={title}>
              {title}
            </option>
          ))}
        </Select>
      ) : (
        <StyledLink to={`/editor/${id}`}>
          <StyledButton
            title="Редактировать колоду"
            outline
            color={theme === 'light' ? '#121214' : '#F7F7F7'}
          />
        </StyledLink>
      )}

      {confirmDel ? (
        <StyledButton
          title="Вы уверены?"
          color="#FFF"
          background="#FD371F"
          onClick={() => {
            setConfirmDel(false);
            delDeck();
          }}
        />
      ) : (
        <StyledButton
          title="Удалить колоду"
          outline
          color="#FD371F"
          hoverColor="#FFF"
          hoverBackground="#FD371F"
          onClick={() => {
            setConfirmDel(true);
          }}
        />
      )}
    </Wrapper>
  );
}

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 600px;
  gap: 20px;
  justify-content: flex-end;
`;

const Select = styled.select`
  border: none;
  border-radius: 5px;
  background: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.text};
  color: ${(props) => props.theme.colors.text};
  padding: 10px 0px;
  padding-left: 16px;
  max-height: 40px;
  font-size: 16px;
  max-width: 150px;
`;
