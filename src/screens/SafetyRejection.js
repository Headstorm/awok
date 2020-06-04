import React from "react";
import { Button, withStyles } from "@material-ui/core";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const GoingHomeButton = withStyles(() => ({
  root: {
    color: "#FFFFFF",
    backgroundColor: "#518DFD",
  },
}))(Button);

const BaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem;
  flex: 1 0;
`;

const HeaderQuestion = styled.h2`
  margin-bottom: 2rem;
`;

const SafetyRejection = (props) => {
  const nextPath = (path) => {
    props.history.push(path);
  };

  return (
    <BaseContainer>
      <HeaderQuestion>
        Going to work with these symptoms puts the rest of your office at risk.
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

export default withRouter(SafetyRejection);
