import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { getCheckInCounts } from "../apiCalls";

const BaseContainer = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto;
  grid-gap: 0.625rem;
  padding: 0.625rem;
  align-self: center;
`;

const StyledButton = withStyles(() => ({
  root: {
    color: "#FFFFFF",
    backgroundColor: "#518DFD",
    marginBottom: "2rem",
    padding: ".5rem 1.375rem",
  },
}))(Button);

const H2 = styled.h2`
  text-align: center
`;

const GoodDay = props => {
  const nextPath = path => {
    props.history.push(path);
  };

  const [count, setCount] = useState(0);

  useEffect(() => {
    getCheckInCounts()
      .then((res) => res.json())
      .then((response) => {
        setCount(response.positiveCount + response.negativeCount);
      })
      .catch((error) => console.log(error));
  });

  return (
    <BaseContainer>
      <H2>
        You have checked in!
        <br />
        {count} haved checked in to go to the office.
        <br />
        Have a great day!
        <br />
        <br />
        Lawrence says "Get to work"
      </H2>
      <StyledButton
          size="large"
          variant="contained"
          onClick={() => nextPath('/')}
        >
          Home Page
      </StyledButton>
    </BaseContainer>
  );
};

export default withRouter(GoodDay);
