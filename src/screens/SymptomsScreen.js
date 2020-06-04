import React from "react";
import { Button, withStyles } from "@material-ui/core";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { patchCheckIn } from "../apiCalls";

const YesButton = withStyles(() => ({
  root: {
    color: "#518DFD",
    borderColor: "#518DFD",
    marginBottom: "2rem",
    "grid-row-start": 2,
    "grid-column-start": 3,
    width: "50%",
    /*eslint no-useless-computed-key: "error"*/
    ["@media (max-width:425px)"]: { width: "100%" },
  },
}))(Button);

const NoButton = withStyles(() => ({
  root: {
    color: "#FFFFFF",
    backgroundColor: "#518DFD",
    width: "50%",
    ["@media (max-width:425px)"]: { width: "100%" },
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
  flex-direction: column;
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
        <YesButton
          size="large"
          variant="outlined"
          onClick={() => nextPath("/safety-rejection")}
        >
          Yes
        </YesButton>
        <NoButton
          size="large"
          variant="contained"
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
        </NoButton>
      </ButtonsContainer>
    </BaseContainer>
  );
};

export default withRouter(COVIDCheck);
