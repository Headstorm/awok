import React from 'react';
import styled from 'styled-components';

const DonutTrack = styled.circle`
  fill: transparent;
  stroke: #dae2e5;
  stroke-width: 26;
`;

const Indicator = styled.circle`
  fill: transparent;
  stroke: #80e27e;
  stroke-width: 26;
`;

const Indicator2 = styled.circle`
  fill: transparent;
  stroke: #8cbdff;
  stroke-width: 26;
`;

const Donut = styled.svg`
  grid-column-start: 1;
  margin: 0;
  border-radius: 50%;
  display: block;
  padding: 1rem;
`;

const Label = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const BaseContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  padding-bottom: 1rem;
  justify-content: center;
`;

const LabelsContainer = styled.div`
  grid-column-start: 2;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const SVGLabel = styled.svg`
  height: 3rem;
  width: 3rem;
  margin: 0 auto;
`;

const DonutChart = (props) => {
  const size = 115;
  const halfSize = size * 0.5;
  const strokewidth = 26;
  const radius = halfSize - strokewidth * 0.5;
  const circumference = 2 * Math.PI * radius;

  const values = props.values;

  const spotsOpen =
    props.totalOccupancy - props.spotsTaken - props.spotsReserved;

  const strokeValues = values.map((val) => (val * circumference) / 100);

  const dashValue = strokeValues[0] + ' ' + circumference;
  const dashValue2 = strokeValues[1] + strokeValues[0] + ' ' + circumference;

  const trackStyle = { strokeWidth: strokewidth };
  const indicatorStyle = {
    strokeWidth: strokewidth,
    strokeDasharray: dashValue,
  };
  const indicatorStyle2 = {
    strokeWidth: strokewidth,
    strokeDasharray: dashValue2,
  };
  const rotateValue = 'rotate(-90 ' + halfSize + ',' + halfSize + ')';
  return (
    <BaseContainer>
      <Donut width={size} height={size} className="donutchart">
        <DonutTrack
          r={radius}
          cx={halfSize}
          cy={halfSize}
          transform={rotateValue}
          style={trackStyle}
          className="donutchart-track"
        />
        <Indicator2
          r={radius}
          cx={halfSize}
          cy={halfSize}
          transform={rotateValue}
          style={indicatorStyle2}
          className="donutchart-indicator"
        />
        <Indicator
          r={radius}
          cx={halfSize}
          cy={halfSize}
          transform={rotateValue}
          style={indicatorStyle}
          className="donutchart-indicator"
        />
      </Donut>
      <LabelsContainer>
        <Label>
          <label>
            <b>{spotsOpen}</b> spots open
          </label>
          <SVGLabel>
            <circle cx={20} cy={20} r={10} fill="#DAE2E5" />
          </SVGLabel>
        </Label>
        <Label>
          <label>
            <b>{props.spotsTaken}</b> spots occupied
          </label>
          <SVGLabel>
            <circle cx={20} cy={20} r={10} fill="#80e27e" />
          </SVGLabel>
        </Label>
        <Label>
          <label>
            <b>{props.spotsReserved}</b> spots reserved
          </label>
          <SVGLabel>
            <circle cx={20} cy={20} r={10} fill="#8cbdff" />
          </SVGLabel>
        </Label>
      </LabelsContainer>
    </BaseContainer>
  );
};

export default DonutChart;
