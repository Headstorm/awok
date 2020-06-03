import React from 'react';
import styled from 'styled-components';

const BaseContainer = styled.div`
  flex-direction: column;
  align-self: center;
  padding: 2rem;
  flex: 1 0 auto;
`;

const AlreadyCheckedIn = (props) => {
  return (
    <BaseContainer>
      <h2>
        You have already checked in for the day.
        Please come back tomorrow to check in again!
      </h2>
    </BaseContainer>
  );
};

export default AlreadyCheckedIn;
