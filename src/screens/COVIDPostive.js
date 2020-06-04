import React from "react";
import { Button, withStyles } from "@material-ui/core";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const GoingHomeButton = withStyles(() => ({
  root: {
    color: "#FFFFFF",
    backgroundColor: "#D96239",
    "grid-row-start": 2,
    "grid-column-start": 2,
  },
}))(Button);

const BaseContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-template-columns: repeat(3, auto);
  grid-gap: 0.625rem;
  padding: 0.625rem;
`;

const HeaderQuestion = styled.h2`
  margin-bottom: 2rem;
  grid-row-start: 1;
  grid-column-start: 2;
  text-align: center;
`;

const COVIDPositive = (props) => {
  const nextPath = (path) => {
    props.history.push(path);
  };

  return (
    <BaseContainer>
      <HeaderQuestion>
        CDC Guidelines state "Stay home until 14 days after your last exposure"
        <br />
        <br />
        Please work from home today.
      </HeaderQuestion>
      <GoingHomeButton
        size="large"
        variant="contained"
        onClick={() => nextPath("/wfh-conf")}
      >
        Going back home
      </GoingHomeButton>
    </BaseContainer>
  );
};

export default withRouter(COVIDPositive);
