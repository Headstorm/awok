import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getCheckInCounts } from '../apiCalls';
import HeadstormLogo from '../headstorm_logo.png';
import { withRouter } from 'react-router-dom';

const BaseContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1.5rem;
  background-color: rgb(209, 224, 224,30%);
  border-bottom: .2rem solid #d1e0e0;
`;

const Logo = styled.img`
  width: 50%;
  height: 50%;
`;

const Count = styled.div`
  margin-left: auto;
`;

const Header = props => {
  const showCheckInCount = ['/', '/safety-rejection'].includes(props.location.pathname) ? false : true;
  // eslint-disable-next-line no-unused-vars
  const [immuneCount, setImmuneCount] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [fineCount, setFineCount] = useState(0);
  const totalOccupancy = 25;

  useEffect(() => {
    getCheckInCounts()
      .then((res) => res.json())
      .then((response) => {
        setImmuneCount(response.positiveCount);
        setFineCount(response.negativeCount);
      })
      .catch((error) => console.log(error));
  });

  return (
    <BaseContainer>
      <Logo src={HeadstormLogo} />
      {showCheckInCount ? <Count>Checked In {immuneCount + fineCount} / {totalOccupancy}</Count> : null}
    </BaseContainer>
  )
};

export default withRouter(Header);