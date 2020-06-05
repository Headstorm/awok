import React from "react";
import { Button, withStyles } from "@material-ui/core";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { patchCheckIn } from "../apiCalls";
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

const StyledButton = withStyles(() => ({
  root: {
    color: "#518DFD",
    borderColor: "#518DFD",
    width: "50%",
    margin: '1rem',
    "@media (max-width:425px)": { width: "100%" },
  },
}))(Button);

const StyledButton2 = withStyles(() => ({
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
  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-template-columns: repeat(3, auto);
  grid-gap: 0.625rem;
  padding: 0.625rem;
`;

const HeaderDiv = styled.div`
  margin-bottom: 2rem;
  grid-row-start: 1;
  grid-column-start: 2;
  text-align: center;
`;

const ButtonsContainer = styled.div`
  grid-row-start: 3;
  grid-column-start: 2;
  align-items: center;
  display: flex;
  flex-direction: row;
  @media (max-width:425px) {
    flex-direction: column;
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
          Have you experienced any of the following in the last 24 hours?
          <br />
          <br />
          Loss of taste and smell <br />
          Fever <br />
          Dry Cough <br />
          Sore Throat <br />
          ...{" "}
        </h2>
      </HeaderDiv>
      <ButtonsContainer>
        <StyledButton2
          size="large"
          variant="contained"
          startIcon={<CheckIcon/>}
          onClick={() => nextPath("/safety-rejection")}
        >
          Yes
        </StyledButton2>
        <StyledButton2
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
        </StyledButton2>
      </ButtonsContainer>
    </BaseContainer>
  );
};

export default withRouter(COVIDCheck);
