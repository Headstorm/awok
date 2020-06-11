import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Typography, Link, Container } from '@material-ui/core';

const BaseContainer = styled.div`
  padding: 1rem;
  text-align: center;
  background-color: #f0f2f2;
  `;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="https://headstorm.com/">
        Headstorm
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Footer = () => (
  <BaseContainer>
    <Container>
      <Typography variant="body2">
        All answers are completely anonymous. We do not track your phone, location,
        or anything about you.
      </Typography>
      <Copyright />
    </Container>
  </BaseContainer>
);

export default withRouter(Footer);
