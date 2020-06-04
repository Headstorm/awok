import React from 'react';
import styled from 'styled-components';

const BaseContainer = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto;
  grid-gap: .625rem;
  padding: .625rem;
  align-self: center;
`;

const GoodDay = (props) => {
  return (
    <BaseContainer>
      <h2>
        Have a great day!
        <br />
        <br />
        Lawrence says
        <br />
        "Get to work"
      </h2>
    </BaseContainer>
  );
};

export default GoodDay;
