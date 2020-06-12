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
  const totalOccupancy = localStorage.getItem('occupancyRule');
  const clearOutTime = new Date(
    localStorage.getItem('reservationClearOut')
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
        localStorage.setItem('successMessage', response.successMessage);
        localStorage.setItem('occupancyRule', response.occupancyRule);
        localStorage.setItem('currentRules', response.currentRules);
        localStorage.setItem('companyName', response.companyName);
        localStorage.setItem(
          'reservationClearOut',
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
        setDonutVal(
          [
            response.today.positiveCount + response.today.negativeCount,
            response.today.reservationsToday,
          ].map((val) => (val / totalOccupancy) * 100)
        );
      })
      .catch((error) => console.log(error));
  }, [totalOccupancy]);

  const hasCheckedInToday =
    localStorage.getItem('checkInDate') ===
    new Date().toISOString().slice(0, 10);

  const checkInDisabled = immuneCount + fineCount === totalOccupancy;

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
          <b>{immuneCount + fineCount}</b> out of <b>{totalOccupancy}</b>{' '}
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
          spotsTaken={immuneCount + fineCount}
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
              if (localStorage.getItem('covidDate')) {
                localStorage.setItem(
                  'checkInDate',
                  new Date().toISOString().slice(0, 10)
                );
                nextPath('/good-day');
              } else {
                nextPath('/covid-check');
              }
            }}
          >
            {!checkInDisabled ? 'Check In' : 'Sorry, capacity reached'}
          </StyledButton>
          <ReserveButton
            size="large"
            variant="outlined"
            onClick={() => nextPath('/reservation')}
          >
            Reserve
          </ReserveButton>
          <RemoteButton size="large" onClick={() => nextPath('/wfh-conf')}>
            I'm working remote today
          </RemoteButton>
        </>
      ) : null}
      {showInfoModal ? (
        <InfoPopUp
          handleDismiss={handleDismiss}
          content={localStorage.getItem('currentRules')}
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
