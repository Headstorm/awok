import React, { useState, useEffect } from "react";
import { Button, withStyles } from "@material-ui/core";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { getCheckInCounts } from "../apiCalls";
import DonutChart from "../common/DonutChart";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import InfoPopUp from "../common/InfoPopUp";
import AlreadyCheckedIn from "./AlreadyCheckedIn";

const StyledButton = withStyles(() => ({
  root: {
    color: "#FFFFFF",
    backgroundColor: "#518DFD",
    marginBottom: "2rem",
    padding: ".5rem 1.375rem",
  },
}))(Button);

const BaseContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-gap: 0.625rem;
  padding: 0.625rem;
`;

const HeaderDiv = styled.div`
  grid-column-start: 2;
  text-align: center;
  align-content: space-between;
`;

const H2 = styled.h2`
  text-align: center;
  padding: 0rem;
  margin: 0;
`;

const RemoteH2 = styled.h2`
  text-align: center;
  padding-bottom: 2rem;
  margin: 0;
`;

const RemoteDiv = styled.div`
  grid-column-start: 2;
  grid-row-start: 2;
  text-align: center;
`;

const H3 = styled.h3`
  text-align: center;
`;

const CheckIn = (props) => {
  const nextPath = (path) => {
    props.history.push(path);
  };

  localStorage.clear();

  const [showInfoModal, setShowInfoModal] = useState(false);
  const [donutval, setDonutVal] = useState(0);
  const [immuneCount, setImmuneCount] = useState(0);
  const [fineCount, setFineCount] = useState(0);
  const totalOccupancy = 25;

  const handleDismiss = () => {
    setShowInfoModal(false);
  };

  useEffect(() => {
    getCheckInCounts()
      .then((res) => res.json())
      .then((response) => {
        setImmuneCount(response.positiveCount);
        setFineCount(response.negativeCount);
        setDonutVal(
          ((response.positiveCount + response.negativeCount) / totalOccupancy) *
            100
        );
      })
      .catch((error) => console.log(error));
  });

  const hasCheckedInToday =
    localStorage.getItem("checkInDate") ===
    new Date().toISOString().slice(0, 10);

  return hasCheckedInToday ? (
    <AlreadyCheckedIn />
  ) : (
    <BaseContainer>
      <HeaderDiv>
        <H2>Want to come into the office today?</H2>
        <H3>
          {immuneCount + fineCount} out of {totalOccupancy} spots taken
          <InfoOutlinedIcon
            fontSize="small"
            onClick={() => setShowInfoModal(true)}
          />
        </H3>
        <h3>Today's checkins</h3>
        <DonutChart
          value={donutval}
          spotsTaken={immuneCount + fineCount}
          totalOccupancy={totalOccupancy}
        />
        <StyledButton
          size="large"
          variant="contained"
          onClick={() => {
            if (localStorage.getItem("covidDate")) {
              nextPath("/good-day");
            } else {
              nextPath("/covid-check");
            }
          }}
        >
          Check In
        </StyledButton>
      </HeaderDiv>
      <RemoteDiv>
        <RemoteH2>Plan on working remote?</RemoteH2>
        <StyledButton
          size="large"
          variant="contained"
          onClick={() => nextPath("/good-day")}
        >
          Working Remote
        </StyledButton>
      </RemoteDiv>
      {showInfoModal ? <InfoPopUp handleDismiss={handleDismiss} /> : null}
    </BaseContainer>
  );
};

export default withRouter(CheckIn);
