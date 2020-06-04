import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const BaseContainer = styled.div`
  padding: 1rem;
  align-self: flex-end;
  background-color: rgb(209, 224, 224,30%);
`;

const Footer = () => {
<<<<<<< HEAD
=======
  const BaseContainer = styled.div`
    padding: 1rem;
    text-align: center;
    background-color: rgb(209, 224, 224, 30%);
  `;
>>>>>>> origin/master

  return (
    <BaseContainer>
      All answers are completely anonymous. We do not track your phone,
      location, or anything about you
    </BaseContainer>
  );
};

export default withRouter(Footer);
