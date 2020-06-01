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

const YesButton = withStyles(() => ({
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
  margin: 5rem 2rem 0rem 2rem;
`;

const HeaderDiv = styled.div`
  margin-bottom: 5rem;
`;

const AlertsOptIn = (props) => {
  const nextPath = (path) => {
    props.history.push(path);
  };

  return (
    <BaseContainer>
      <HeaderDiv>
        <h2>
          Would you like to receive alerts for this office?
          <br />
          <br />
          Your health status is never tied to your email address or phone
          number. These are used for anonymous alerting only.
        </h2>
      </HeaderDiv>
      <form noValidate>
        <TextField fullWidth label="Email Address" />
        <TextField fullWidth label="Phone Number" />
      </form>
      <FormControlLabel
        control={<Checkbox />}
        label="Remember my answer on this device"
      />
      <YesButton
        size="large"
        variant="contained"
        onClick={() => nextPath('/good-day')}
      >
        Yes
      </YesButton>
      <NoButton size="large" onClick={() => nextPath('/good-day')}>
        No thanks
      </NoButton>
    </BaseContainer>
  );
};

export default withRouter(AlertsOptIn);
