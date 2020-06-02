import React from 'react';
import {
  Button,
  withStyles,
  TextField,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const CheckInButton = withStyles(() => ({
  root: {
    color: '#FFFFFF',
    backgroundColor: '#D96239',
    marginBottom: '2rem',
  },
}))(Button);

const NoButton = withStyles(() => ({
  root: {
    color: '#D96239',
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

const COVIDTestDate = (props) => {
  const nextPath = (path) => {
    props.history.push(path);
  };

  return (
    <BaseContainer>
      <HeaderDiv>
        <h2>
          When did you test positive?
          <br />
          <br />
          We will use this information to alert other people who have visited
          this office.
        </h2>
      </HeaderDiv>
      <form noValidate>
        <TextField label="Month" />
        <TextField label="Day" />
        <TextField label="Year" />
      </form>
      <FormControlLabel
        control={<Checkbox />}
        label="Remember my answer on this device"
      />
      <CheckInButton
        size="large"
        variant="contained"
        onClick={() => nextPath('/alerts')}
      >
        Check In
      </CheckInButton>
      <NoButton size="large" onClick={() => nextPath('/alerts')}>
        I would rather not say
      </NoButton>
    </BaseContainer>
  );
};

export default withRouter(COVIDTestDate);
