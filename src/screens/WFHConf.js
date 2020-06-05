import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { Button, withStyles } from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';

const BaseContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-template-columns: repeat(5, auto);
  grid-gap: 0.625rem;
  padding: 0.625rem;
  align-self: center;
`;

const H2 = styled.p`
  grid-row-start: 1;
  grid-column-start: 3;
  text-align: center;
`;

const StyledButton = withStyles(() => ({
  root: {
    color: "#FFFFFF",
    backgroundColor: "#518DFD",
    marginBottom: "2rem",
    padding: ".5rem 1.375rem",
    'grid-row-start': 2,
    'grid-column-start': 3,
    width: '50%',
    'justify-self': 'center',
    "@media (max-width:425px)": {
      width: "100%",
    }
  },
}))(Button);

const WFHConf = (props) => {
  const nextPath = (path) => {
    props.history.push(path, { prevPath: props.location.pathname });
  };

  let additionalMessage = null;
  const prevPath = props.location.state.prevPath || null;
  switch(prevPath) {
    case '/symptoms-screen':
      additionalMessage = (<>
        Going to work with these symptoms puts the rest of your office at risk.
        <br />
        <br />
        Please work from home today.
        <br />
        <br />
      </>);
      break;
    case '/covid-test-date':
      additionalMessage = (<>
        CDC Guidelines state "Stay home until 14 days after your last exposure."
        <br />
        <br />
        Please work from home today.
        <br />
        <br />
      </>);
      break;
    default:
      break;
  }
  return (
    <BaseContainer>
      <H2>
        {additionalMessage}
        Thank you for helping to keep the office safe and healthy.
        <br />
        <br />
        Please remember to reach out to your Project Lead via Slack or email if
        you need to take some time off
      </H2>
      <StyledButton
          size="large"
          variant="contained"
          startIcon={<HomeIcon/>}
          onClick={() => nextPath('/')}
        >
          Home Page
      </StyledButton>
    </BaseContainer>
  );
};

export default withRouter(WFHConf);
