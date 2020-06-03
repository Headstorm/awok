import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const Footer = (props) => {
  const BaseContainer = styled.div`
    padding: 1rem;
    align-self: flex-end;
    ${!props.startText && `
      background-color: rgb(209, 224, 224,30%);
    `}
  `;

  return (
    <BaseContainer>
      All answers are completely anonymous. We do not track your phone,
          location, or anything about you
    </BaseContainer>
  )
};

export default withRouter(Footer);