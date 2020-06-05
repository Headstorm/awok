import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getCheckInCounts } from '../apiCalls';
import HeadstormLogo from '../headstorm_logo.png';
import { withRouter } from 'react-router-dom';

const BaseContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1.5rem;
  background-color: rgb(209, 224, 224, 30%);
  border-bottom: 0.2rem solid #d1e0e0;
  max-height: 1.5rem;
`;

const Logo = styled.img`
  width: 20%;
  height: 20%;
  @media (max-width: 425px) {
    width: 50%;
    height: 50%;
  }
`;

const Count = styled.div`
  margin-left: auto;
`;

const Header = (props) => {
  const showCheckInCount = ['/', '/safety-rejection', '/good-day'].includes(
    props.location.pathname
  )
    ? false
    : true;
  const [numCheckedIn, setNumCheckedIn] = useState(0);
  const totalOccupancy = localStorage.getItem('occupancyRule');

  useEffect(() => {
    getCheckInCounts()
      .then((res) => res.json())
      .then((response) => {
        setNumCheckedIn(response.today.positiveCount + response.today.negativeCount);
      })
      .catch((error) => console.log(error));
  });

  return (
    <BaseContainer>
      <Logo src={HeadstormLogo} />
      {showCheckInCount ? (
        <Count>
          Checked In {numCheckedIn} / {totalOccupancy}
        </Count>
      ) : null}
    </BaseContainer>
  );
};

export default withRouter(Header);
