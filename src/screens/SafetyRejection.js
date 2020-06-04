import React from 'react';
import { Button, withStyles } from '@material-ui/core';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const GoingHomeButton = withStyles(() => ({
  root: {
    color: '#FFFFFF',
    backgroundColor: '#D96239',
    'grid-row-start': 2,
    'grid-column-start': 3,
  },
}))(Button);

const BaseContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-template-columns: repeat(5, auto);
  grid-gap: .625rem;
  padding: .625rem;
`;

const HeaderQuestion = styled.h2`
  margin-bottom: 2rem;
  grid-row-start: 1;
  grid-column-start: 3;
`;

const SafetyRejection = (props) => {
  const nextPath = (path) => {
    props.history.push(path);
  };

  return (
    <BaseContainer>
      <HeaderQuestion>
        Going to work with these symptoms puts the rest of your office at risk.
        <br />
        <br />
        Please work from home today.
      </HeaderQuestion>
      <GoingHomeButton
        size="large"
        variant="contained"
        onClick={() => nextPath('/wfh-conf')}
      >
        Going back home
      </GoingHomeButton>
    </BaseContainer>
  );
};

export default withRouter(SafetyRejection);
