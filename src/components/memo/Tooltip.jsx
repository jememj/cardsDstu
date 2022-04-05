import React from 'react';
import styled from 'styled-components';

export default function Tooltip({ count, mode }) {
  return (
    <Wrapper isHidden={mode !== 'deck' || count > 1}>
      Пробел или нажатие на карточку переворачивает ее.
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: ${(props) => props.theme.colors.tooltipBg};
  color: #c7c7c7;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 478px;
  padding: 10px;
  font-size: 16px;
  line-height: 16px;
  margin-top: 20px;
  margin-bottom: 40px;

  visibility: ${(props) => (props.isHidden ? 'hidden' : 'visible')};
`;
