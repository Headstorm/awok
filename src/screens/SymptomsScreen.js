import React from 'react';
import { Button, withStyles } from '@material-ui/core';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';

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
  margin: 2rem 2rem 0rem 2rem;
`;

const HeaderDiv = styled.div`
  margin-bottom: 2rem;
`;

const COVIDCheck = (props) => {
  const nextPath = (path) => {
    props.history.push(path);
  };

  return (
    <BaseContainer>
      <HeaderDiv>
        <h2>
          Have you experienced any of the following in the last 24 hours?
          <br />
          <br />
          Loss of taste and smell <br />
          Fever <br />
          Dry Cough <br />
          Sore Throat <br />
          ...{' '}
        </h2>
      </HeaderDiv>
      <YesButton
        size="large"
        variant="outlined"
        onClick={() => nextPath('/safety-rejection')}
      >
        Yes
      </YesButton>
      <NoButton
        size="large"
        variant="contained"
        onClick={() => nextPath('/alerts')}
      >
        No
      </NoButton>
    </BaseContainer>
  );
};

export default withRouter(COVIDCheck);
