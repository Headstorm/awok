import React from "react";
import { Button, withStyles } from "@material-ui/core";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { patchCheckIn } from '../services/apiCalls';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { STORAGE, PATHS } from '../common/constants';

const StyledButton = withStyles(() => ({
  root: {
    color: "#FFFFFF",
    backgroundColor: "#518DFD",
    width: "50%",
    margin: '1rem',
    "@media (max-width:425px)": {
      width: "100%",
      margin: '.5rem'
    },
  },
}))(Button);

const BaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0rem 2rem 0rem 2rem;
  flex: 1 0;
  align-items: center;
`;

const HeaderDiv = styled.div`
  margin-bottom: 0.5rem;
  text-align: center;
  h2 {
    text-align: center;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 60%;
  text-align: center;
  justify-content: center;
  @media (max-width:425px) {
    width: 100%;
  }
`;

const StyledList = withStyles(() => ({
  root: {
    display: 'inline-block',
    'text-align': 'left',
  },
}))(Button);

const COVIDCheck = (props) => {
  const nextPath = (path) => {
    props.history.push(path);
  };

  const goodDay = () => {
    nextPath(PATHS.GOOD_DAY);
    localStorage.setItem(
      STORAGE.CHECK_IN_DATE,
      new Date().toISOString().slice(0, 10)
    );

  }

  const checkin = () => {
    const isPositive = localStorage.getItem(STORAGE.IS_POSITIVE);
    const reservationCode = localStorage.getItem(STORAGE.RESERVATION_CODE);

    if (reservationCode) {
      patchCheckIn(isPositive, reservationCode)
        .then(response => {
          goodDay();
        });
      localStorage.removeItem(STORAGE.RESERVATION_CODE)
    }
    else {
      patchCheckIn(isPositive)
        .then(response => {
          goodDay();
        });
    }
  }

  return (
    <BaseContainer>
      <HeaderDiv>
        <h2>
          Have you experienced any of the following in the last 2-14 days?
        </h2>
        <StyledList>
          <li>Fever/Chills</li>
          <li>Shortness of breath</li>
          <li>Difficulty breathing</li>
          <li>Sore throat</li>
          <li>Congestion</li>
          <li>Diarrhea</li>
          <li>Fatigue</li>
          <li>Headache</li>
          <li>New loss of taste/smell</li>
          <li>Muscle/Body aches</li>
          <li>Cough</li>
          <li>Runny nose</li>
          <li>Nausea</li>
          <li>Vomiting</li>
        </StyledList>
      </HeaderDiv>
      <ButtonsContainer>
        <StyledButton
          size="large"
          variant="contained"
          startIcon={<CheckIcon />}
          onClick={() => nextPath(PATHS.SAFETY_REJECTION)}
        >
          Yes
        </StyledButton>
        <StyledButton
          size="large"
          variant="contained"
          startIcon={<ClearIcon />}
          onClick={() => {
            checkin()
          }}
        >
          No
        </StyledButton>
      </ButtonsContainer>
    </BaseContainer>
  );
};

export default withRouter(COVIDCheck);
