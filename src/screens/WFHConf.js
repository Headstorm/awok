import React from "react";
import styled from "styled-components";

const BaseContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-template-columns: repeat(5, auto);
  grid-gap: 0.625rem;
  padding: 0.625rem;
  align-self: center;
`;

const H2 = styled.h2`
  grid-row-start: 1;
  grid-column-start: 3;
  text-align: center;
`;

const WFHConf = (props) => {
  return (
    <BaseContainer>
      <H2>
        Thank you for helping to keep the office safe and healthy.
        <br />
        <br />
        Please remember to reach out to your Project Lead via Slack or email if
        you need to take some time off
      </H2>
    </BaseContainer>
  );
};

export default WFHConf;
