import React from "react";
import styled from "styled-components";

const BaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  margin: 2rem 2rem 0rem 2rem;
  flex: 1 0;
`;

const WFHConf = (props) => {
  return (
    <BaseContainer>
      <h2>
        Thank you for helping to keep the office safe and healthy.
        <br />
        <br />
        Please remember to reach out to your Project Lead via Slack or email if
        you need to take some time off
      </h2>
    </BaseContainer>
  );
};

export default WFHConf;
