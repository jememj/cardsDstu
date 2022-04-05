import React from 'react';
import styled from 'styled-components';

import StyledButton from '../buttons/StyledButton';

export default function Button({ next }) {
  return (
    <Wrapper>
      <Buttons
        title="Next"
        outline
        color="#3e7d63"
        hoverColor="#ffffff"
        hoverBackground="#3e7d63"
        onClick={(e) => {
          next('next');
          e.target.blur();
        }}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 300px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
`;

const Buttons = styled(StyledButton)`
  padding: 20px 30px;
  max-width: 115px;
  max-height: 60px;
`;
