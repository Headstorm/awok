import React from 'react';
import { Button, withStyles } from '@material-ui/core';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Footer from '../common/Footer';
import Header from '../common/Header';

const YesButton = withStyles(() => ({
  root: {
    color: '#D96239',
    borderColor: '#D96239',
    marginBottom: '2rem',
  },
}))(Button);

const NoButton = withStyles(() => ({
  root: {
    color: '#FFFFFF',
    backgroundColor: '#D96239',
  },
}))(Button);

const BaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem;
`;

const HeaderQuestion = styled.h2`
  margin-bottom: 2rem;
`;

const COVIDCheck = (props) => {
  const handleClick = (path, isPositive) => {
    localStorage.setItem('isPositive', isPositive);
    props.history.push(path);
  };

  return (
    <>
      <Header checkInCount/>
      <BaseContainer>
        <HeaderQuestion>
          Have you ever tested positive for Covid-19?
        </HeaderQuestion>
        <YesButton
          size="large"
          variant="outlined"
          onClick={() => handleClick('/covid-test-date', true)}
        >
          Yes
        </YesButton>
        <NoButton
          size="large"
          variant="contained"
          onClick={() => handleClick('/symptoms-screen', false)}
        >
          No
        </NoButton>
      </BaseContainer>
      <Footer/>
    </>
  );
};

export default withRouter(COVIDCheck);
