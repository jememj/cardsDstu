import React from 'react';
import styled from 'styled-components';

import filters from '../../constants/filters';
import FilterButton from '../buttons/FilterButton';

export default function Filters() {
  return (
    <Wrapper>
      {filters.map(({ title, category }, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <FilterButton key={index} title={title} category={category} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
`;
