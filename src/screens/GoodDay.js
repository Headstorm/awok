import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { getCheckInCounts } from "../apiCalls";
import HomeIcon from '@material-ui/icons/Home';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const BaseContainer = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto;
  grid-gap: 0.625rem;
  padding: 0.625rem;
  justify-content: center;
`;

const StyledButton = withStyles(() => ({
  root: {
    color: "#FFFFFF",
    backgroundColor: "#518DFD",
    marginBottom: "2rem",
    padding: ".5rem 1.375rem",
    width: '50%',
    'justify-self': 'center',
    "@media (max-width:425px)": {
      width: "100%",
    }
  },
}))(Button);

const H2 = styled.p`
  text-align: center
`;

const Loading = styled.div`
  text-align: center;
`;

const Icon = styled.div`
  text-align: center;
  color: #25db47;
`;

const StyledIcon = withStyles(() => ({
  root: {
    fontSize: 50,
  },
}))(CheckCircleIcon);

const GoodDay = props => {
  const nextPath = path => {
    props.history.push(path, { prevPath: props.location.pathname });
  };

  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCheckInCounts()
      .then((res) => res.json())
      .then((response) => {
        setCount(response.today.positiveCount + response.today.negativeCount);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  });

  const numPeopleMessage = count > 1 ? 'people checked in to go to the office today.'
    : 'person checked in to go to the office today.';

  return !loading ? (
    <BaseContainer>
      <Icon><StyledIcon/></Icon>
      <H2>
        You have checked in.
        <br />
        <b>{count}</b> {numPeopleMessage}
        <br />
        <br />
        {localStorage.getItem('successMessage')}
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
  ) : (<Loading>
        <CircularProgress/>
      </Loading>);
};

export default withRouter(GoodDay);
