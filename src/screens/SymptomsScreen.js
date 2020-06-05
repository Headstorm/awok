import React from "react";
import { Button, withStyles } from "@material-ui/core";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { patchCheckIn } from "../apiCalls";
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

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

  h2 {
    text-align: center;
  }
`;

const MiddleDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  h3 {
    margin-top: 0rem;
  }

  .left-column {
  }

  .right-column {
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

const COVIDCheck = (props) => {
  const nextPath = (path) => {
    props.history.push(path);
  };

  return (
    <BaseContainer>
      <HeaderDiv>
        <h2>
          Have you experienced any of the following in the last 2-14 days?
        </h2>
        <MiddleDiv>
          <ColumnDiv className="left-column">
            <h3>Fever/Chills</h3>
            <h3>Shortness of breath</h3>
            <h3>Difficulty breathing</h3>
            <h3>Sore throat</h3>
            <h3>Congestion</h3>
            <h3>Diarrhea</h3>
            <h3>Fatigue</h3>
          </ColumnDiv>
          <ColumnDiv className="right-column">
            <h3>Headache</h3>
            <h3>New loss of taste/smell</h3>
            <h3>Muscle/Body aches</h3>
            <h3>Cough</h3>
            <h3>Runny nose</h3>
            <h3>Nausea</h3>
            <h3>Vomiting</h3>
          </ColumnDiv>
        </MiddleDiv>
      </HeaderDiv>
      <ButtonsContainer>
        <StyledButton
          size="large"
          variant="contained"
          startIcon={<CheckIcon/>}
          onClick={() => nextPath("/safety-rejection")}
        >
          Yes
        </StyledButton>
        <StyledButton
          size="large"
          variant="contained"
          startIcon={<ClearIcon/>}
          onClick={() => {
            patchCheckIn(localStorage.getItem("isPositive"));
            props.history.push("/good-day");
            localStorage.setItem(
              "checkInDate",
              new Date().toISOString().slice(0, 10)
            );
          }}
        >
          No
        </StyledButton>
      </ButtonsContainer>
    </BaseContainer>
  );
};

export default withRouter(COVIDCheck);
