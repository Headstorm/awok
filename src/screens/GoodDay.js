import React from 'react';
import styled from 'styled-components';

const BaseContainer = styled.div`
  flex-direction: column;
  align-self: center;
  flex: 1 0 auto;
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
