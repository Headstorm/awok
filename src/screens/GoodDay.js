import React from 'react';
import styled from 'styled-components';

const BaseContainer = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto;
  grid-gap: 0.625rem;
  padding: 0.625rem;
  align-self: center;
`;

const GoodDay = (props) => {
  return (
    <BaseContainer>
      <h2>{localStorage.getItem('successMessage')}</h2>
    </BaseContainer>
  );
};

export default GoodDay;
