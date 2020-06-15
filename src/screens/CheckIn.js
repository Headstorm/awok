import React, { useState, useEffect } from 'react';
import { Button, withStyles } from '@material-ui/core';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { getCheckInCounts, getSettings } from '../services/apiCalls';
import DonutChart from '../common/DonutChart';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import InfoPopUp from '../common/InfoPopUp';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { PATHS, STORAGE } from '../common/constants';


const StyledButton = withStyles(() => ({
  root: {
    color: '#FFFFFF',
    backgroundColor: '#518DFD',
    marginBottom: '1rem',
    padding: '.5rem 1.375rem',
    'grid-row-start': 2,
    'grid-column-start': 2,
    'justify-self': 'center',
    width: '50%',
    '@media (max-width:425px)': { width: '100%' },
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

const H3 = styled.p`
  text-align: center;
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

const RemoteButton = withStyles(() => ({
  root: {
    color: '#518DFD',
    borderColor: '#518DFD',
    'grid-row-start': 4,
    'grid-column-start': 2,
    'justify-self': 'center',
    width: '50%',
    '@media (max-width:425px)': { width: '100%' },
  },
}))(Button);

const ReserveButton = withStyles(() => ({
  root: {
    color: '#518DFD',
    borderColor: '#518DFD',
    'grid-row-start': 3,
    'grid-column-start': 2,
    'justify-self': 'center',
    width: '50%',
    '@media (max-width:425px)': { width: '100%' },
  },
}))(Button);

const CheckIn = (props) => {
  const nextPath = (path) => {
    props.history.push(path);
  };

  const [showInfoModal, setShowInfoModal] = useState(false);
  const [donutValue, setDonutVal] = useState([0, 0]);
  const [immuneCount, setImmuneCount] = useState(0);
  const [fineCount, setFineCount] = useState(0);
  const [reserveCount, setReserveCount] = useState(0);
  const [reserveCheckedIn, setReserveCheckedIn] = useState(0)
  const totalOccupancy = localStorage.getItem(STORAGE.OCCUPANCY_RULE);
  const clearOutTime = new Date(
    localStorage.getItem(STORAGE.RESERVATION_CLEAR_OUT)
  ).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  const [loading, setLoading] = useState(true);

  const handleDismiss = () => {
    setShowInfoModal(false);
  };

  useEffect(() => {
    getSettings()
      .then((res) => res.json())
      .then((response) => {
        localStorage.setItem(STORAGE.SUCCESS_MESSAGE, response.successMessage);
        localStorage.setItem(STORAGE.OCCUPANCY_RULE, response.occupancyRule);
        localStorage.setItem(STORAGE.CURRENT_RULES, response.currentRules);
        localStorage.setItem(STORAGE.COMPANY_NAME, response.companyName);
        localStorage.setItem(STORAGE.RESERVATION_CLEAR_OUT,
          response.reservationClearOut
        );
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
    getCheckInCounts()
      .then((res) => res.json())
      .then((response) => {
        setImmuneCount(response.today.positiveCount);
        setFineCount(response.today.negativeCount);
        setReserveCount(response.today.reservationsToday);
        setReserveCheckedIn(response.today.reservationsTodayCheckedIn)
        setDonutVal(
          [
            response.today.positiveCount + response.today.negativeCount + response.today.reservationsTodayCheckedIn,
            response.today.reservationsToday,
          ].map((val) => (val / totalOccupancy) * 100)
        );
      })
      .catch((error) => console.log(error));
  }, [totalOccupancy]);

  const hasCheckedInToday =
    localStorage.getItem(STORAGE.CHECK_IN_DATE) ===
    new Date().toISOString().slice(0, 10);

  const checkedInCount = immuneCount + fineCount + reserveCheckedIn
  const checkInDisabled = checkedInCount === totalOccupancy;

  return !loading ? (
    <BaseContainer>
      <HeaderDiv>
        {!hasCheckedInToday ? null : (
          <div>
            <Icon>
              <StyledIcon />
            </Icon>
            <p>You have checked in today!</p>
            <br />
          </div>
        )}
        <H3>
          <b>{checkedInCount}</b> out of <b>{totalOccupancy}</b>{' '}
          checked in
          <InfoOutlinedIcon
            fontSize="small"
            onClick={() => setShowInfoModal(true)}
          />
        </H3>
        <h3>Today's checkins</h3>
        <h4>Reservations expire at {clearOutTime}</h4>
        <DonutChart
          values={donutValue}
          spotsTaken={checkedInCount}
          spotsReserved={reserveCount}
          totalOccupancy={totalOccupancy}
        />
      </HeaderDiv>
      {!hasCheckedInToday ? (
        <>
          <StyledButton
            size="large"
            variant="contained"
            disabled={checkInDisabled}
            onClick={() => {
              if (localStorage.getItem(STORAGE.COVID_DATE)) {
                localStorage.setItem(
                  STORAGE.CHECK_IN_DATE,
                  new Date().toISOString().slice(0, 10)
                );
                nextPath(PATHS.GOOD_DAY);
              } else {
                nextPath(PATHS.RESERVATION_CHECK);
              }
            }}
          >
            {!checkInDisabled ? 'Check In' : 'Sorry, capacity reached'}
          </StyledButton>
          <ReserveButton
            size="large"
            variant="outlined"
            onClick={() => nextPath(PATHS.RESERVATION)}
          >
            Reserve
          </ReserveButton>
          <RemoteButton size="large" onClick={() => nextPath(PATHS.WFH_CONFIRM)}>
            I'm working remote today
          </RemoteButton>
        </>
      ) : null}
      {showInfoModal ? (
        <InfoPopUp
          handleDismiss={handleDismiss}
          content={localStorage.getItem(STORAGE.CURRENT_RULES)}
        />
      ) : null}
    </BaseContainer>
  ) : (
    <Loading>
      <CircularProgress />
    </Loading>
  );
};

export default withRouter(CheckIn);
