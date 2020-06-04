import React, { useState } from 'react';
import {
  Button,
  withStyles,
  TextField,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { patchCheckIn } from '../apiCalls';

const CheckInButton = withStyles(() => ({
  root: {
    color: '#FFFFFF',
    backgroundColor: '#D96239',
    marginBottom: '2rem',
  },
}))(Button);

const BaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 2rem 0rem 2rem;
  flex: 1 0;
  `;

const HeaderDiv = styled.div`
  margin-bottom: 2rem;
`;

const COVIDTestDate = (props) => {
  const nextPath = (path) => {
    props.history.push(path);
  };

  const [saveCovidDate, setSaveCovidDate] = useState(false);
  const [covidDate, setCovidDate] = useState();
  const today = new Date();
  const defaultDate = today.toISOString().slice(0,10);
  const twoWeeksAgoDate = new Date(today-(1000 * 60 * 60 * 24 * 14)).toISOString().slice(0,10);

  const onDateChange = (e) => { setCovidDate(e.target.value) }
  const onCheckInClick = () => {
    if(covidDate >= twoWeeksAgoDate) {
      nextPath('/covid-positive')
    } else {
      patchCheckIn(localStorage.getItem('isPositive'));
      props.history.push('/good-day');
      if (saveCovidDate) { localStorage.setItem('covidDate', covidDate); }
    }
  }

  const onCheckboxChange = (e) => {
    setSaveCovidDate(!saveCovidDate);
  }

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
        <TextField
          type='date'
          defaultValue={defaultDate}
          onChange={onDateChange}
        />
      </form>
      <FormControlLabel
        control={<Checkbox onChange={onCheckboxChange} />}
        label="Remember my answer on this device"
      />
      <CheckInButton
        size="large"
        variant="contained"
        onClick={onCheckInClick}
      >
        Check In
      </CheckInButton>
    </BaseContainer>
  );
};

export default withRouter(COVIDTestDate);
