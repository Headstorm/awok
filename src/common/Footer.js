import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


const Footer = props => {
  const BaseContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
  
    ${!props.startText && `
      background-color: rgb(209, 224, 224,30%);
    `}
  `;

  const startText = props.startText ? (
    <>
      This app will ask you a few questions to help ensure a safe and healthy workplace
      <br/>
      <br/>
    </>
  ) : null;

  return (
    <BaseContainer>
      {startText}
      All answers are completely anonymous. We do not track your phone,
          location, or anything about you
    </BaseContainer>
  )
};

export default Footer;