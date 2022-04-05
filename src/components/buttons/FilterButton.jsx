import React, { useState, useEffect } from 'react';
import { useStoreon } from 'storeon/react';
import styled from 'styled-components';

export default function FilterButton({ title = '', active = false, category }) {
  const [isActive, setIsActive] = useState(() => active);

  const { dispatch, filter } = useStoreon('filter');

  const setButtonStatus = () => {
    setIsActive(!isActive);

    if (isActive) {
      dispatch('filter/del', category);
    } else {
      dispatch('filter/pick', category);
    }
  };

  useEffect(() => {
    if (filter !== category) {
      setIsActive(false);
    }
  }, [filter]);

  return (
    <Wrapper isActive={isActive} onClick={setButtonStatus}>
      {title}
    </Wrapper>
  );
}

const Wrapper = styled.button`
  padding: 10px 14px;
  border: 1px solid ${(props) => props.theme.colors.text};
  box-sizing: border-box;
  border-radius: 8px;
  width: max-content;
  min-width: 0;
  cursor: pointer;
  display: flex;
  font-size: 16px;

  color: ${(props) => (props.isActive ? props.theme.colors.white : props.theme.colors.text)};
  background: ${(props) => (props.isActive ? '#45b071' : 'none')};
  border-color: ${(props) => (props.isActive ? props.theme.colors.green : props.theme.colors.text)};

  &:hover {
    border-color: ${(props) => props.theme.colors.green};
    color: ${(props) => (props.isActive ? props.theme.colors.white : props.theme.colors.green)};
    ${(props) => (props.isActive ? `background: ${props.theme.colors.green}` : '')};
  }
`;
