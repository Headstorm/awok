import React, { useState } from "react";
import {
  Button,
  withStyles,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { patchCheckIn } from '../services/apiCalls';
import { STORAGE, PATHS } from '../common/constants';

const CheckInButton = withStyles(() => ({
  root: {
    color: "#FFFFFF",
    backgroundColor: "#518DFD",
    marginBottom: "2rem",
    width: "50%",
    "@media (max-width:425px)": { width: "100%" },
  },
}))(Button);

const ButtonContainer = styled.div`
  grid-row-start: 4;
  grid-column-start: 2;
  text-align: center;
`;

const BaseContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(4, auto);
  grid-template-columns: repeat(3, auto);
  grid-gap: 0.625rem;
  padding: 0.625rem;
`;

const HeaderDiv = styled.div`
  margin-bottom: 1rem;
  grid-row-start: 1;
  grid-column-start: 2;
  text-align: center;
`;

const Form = styled.form`
  grid-row-start: 2;
  grid-column-start: 2;
  text-align: center;
  padding-bottom: 2rem;
`;

const CheckboxContainer = styled.div`
  grid-row-start: 3;
  grid-column-start: 2;
  text-align: center;
`;

const ColoredCheckBox = withStyles(() => ({
  root: {
    color: "#518DFD",
  },
}))(Checkbox);

const COVIDTestDate = (props) => {
  const nextPath = (path) => {
    props.history.push(path);
  };
  const today = new Date();
  const defaultDate = today.toISOString().slice(0, 10);
  const twoWeeksAgoDate = new Date(today - 1000 * 60 * 60 * 24 * 14)
    .toISOString()
    .slice(0, 10);
  
  const [saveCovidDate, setSaveCovidDate] = useState(false);
  const [covidDate, setCovidDate] = useState(defaultDate);

  const onDateChange = (e) => {
    setCovidDate(e.target.value);
  };
  const onCheckInClick = () => {
    if (covidDate >= twoWeeksAgoDate) {
      nextPath(PATHS.COVID_POSITIVE);
    } else {
      patchCheckIn(localStorage.getItem(STORAGE.IS_POSITIVE));
      nextPath(PATHS.GOOD_DAY);
      if (saveCovidDate) {
        localStorage.setItem(STORAGE.COVID_DATE, covidDate);
      }
      localStorage.setItem(
        STORAGE.CHECK_IN_DATE,
        new Date().toISOString().slice(0, 10)
      );
    }
  };

  const onCheckboxChange = (e) => {
    setSaveCovidDate(!saveCovidDate);
  };

  return (
    <BaseContainer>
      <HeaderDiv>
        <h2>
          When did you test positive?
        </h2>
      </HeaderDiv>
      <Form noValidate>
        <TextField
          type="date"
          defaultValue={defaultDate}
          onChange={onDateChange}
        />
      </Form>
      <CheckboxContainer>
        <FormControlLabel
          control={<ColoredCheckBox color='#518DFD' onChange={onCheckboxChange} />}
          label="Remember my answer on this device"
        />
      </CheckboxContainer>
      <ButtonContainer>
        <CheckInButton
          size="large"
          variant="contained"
          onClick={onCheckInClick}
        >
          Check In
        </CheckInButton>
      </ButtonContainer>
    </BaseContainer>
  );
};

export default withRouter(COVIDTestDate);
