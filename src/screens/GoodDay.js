import React from 'react';
import styled from 'styled-components';

const BaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  margin: 10rem 2rem 0rem 2rem;
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
