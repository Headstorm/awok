import React from "react";
import styled from "styled-components";

const DonutTrack = styled.circle`
  fill: transparent;
  stroke: #dae2e5;
  stroke-width: 26;
`;

const Indicator = styled.circle`
  fill: transparent;
  stroke: #518dfd;
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
  const strokewidth = 26;
  const value = props.value;
  const halfsize = size * 0.5;
  const radius = halfsize - strokewidth * 0.5;
  const circumference = 2 * Math.PI * radius;
  const strokeval = (value * circumference) / 100;
  const dashval = strokeval + " " + circumference;
  const spotsOpen = props.totalOccupancy - props.spotsTaken;

  const trackstyle = { strokeWidth: strokewidth };
  const indicatorstyle = { strokeWidth: strokewidth, strokeDasharray: dashval };
  const rotateval = "rotate(-90 " + halfsize + "," + halfsize + ")";

  return (
    <BaseContainer>
      <Donut width={size} height={size} className="donutchart">
        <DonutTrack
          r={radius}
          cx={halfsize}
          cy={halfsize}
          transform={rotateval}
          style={trackstyle}
          className="donutchart-track"
        />
        <Indicator
          r={radius}
          cx={halfsize}
          cy={halfsize}
          transform={rotateval}
          style={indicatorstyle}
          className="donutchart-indicator"
        />
      </Donut>
      <LabelsContainer>
        <Label>
          <label>
            <b>{spotsOpen}</b> Spots Open
          </label>
          <SVGLabel preserveAspectRatio="xMaxYMax meet">
            <circle cx={20} cy={20} r={10} fill="#DAE2E5" />
          </SVGLabel>
        </Label>
        <Label>
          <label>
            <b>{props.spotsTaken}</b> Checked In
          </label>
          <SVGLabel>
            <circle cx={20} cy={20} r={10} fill="#518DFD" />
          </SVGLabel>
        </Label>
      </LabelsContainer>
    </BaseContainer>
  );
};

export default DonutChart;
