import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Snackbar,
  Radio,
  FormControlLabel,
  RadioGroup,
} from '@material-ui/core';
import moment from 'moment';
import MuiAlert from '@material-ui/lab/Alert';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { getSettings, setSettings } from '../services/apiCalls';
import { Line } from 'react-chartjs-2';

const BaseContainer = styled.div`
  display: flex;
  flex: 1 0;
  flex-direction: column;
  justify-content: space-between;
`;

const AdminForm = styled.div`
  margin: 3rem 2rem 0rem 2rem;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 1rem !important;
`;

const StyledNumberField = styled(TextField)`
  width: 45% !important;
  margin-right: 1rem !important;
`;

const StyledRadio = styled(Radio)`
  color: #1380e2 !important;
`;

const FooterDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
`;

const MiddleDiv = styled.div`
  display: flex;
  justify-content: center;

  canvas {
    max-height: 40rem !important;
    max-width: 40rem !important;
  }
`;

const StyledButton = styled(Button)`
  align-self: flex-end;
  margin: 0rem 2rem 1rem 1rem !important;
  width: 8rem;
  background-color: #288bea !important;
  color: #ffffff !important;
`;

const StyledSnackBar = styled(Snackbar)`
  position: inherit !important;
  margin-right: auto;
  margin-left: 2rem;
`;

const StyledRadioGroup = styled(RadioGroup)`
  display: inline !important;
`;

const daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// this assumes a full datetime string
const convertTo12Hour = (time) => {
  return moment(new Date(time), 'HH:mm').format('h a').split(' ');
};

// this assumes a string such as "1 am"
const convertToMilitary = (time, amPm) => {
  return moment(`${time} ${amPm}`, 'h a').format('HH:mm');
};

const convertHourToIsoDate = (time, amPm) => {
  const currentMilitaryTime = convertToMilitary(time, amPm);
  const momentDate = moment(new Date()).format('L');
  const momentDateTime = moment(
    `${momentDate} ${currentMilitaryTime}`,
    'MM/DD/YYYY HH:mm'
  ).format();
  return moment(momentDateTime).toDate().toISOString();
};

const Admin = (props) => {
  const [formData, setFormData] = useState({
    companyName: '',
    occupancyRule: '',
    currentRules: '',
    successMessage: '',
    reservationClearOut: '12',
  });
  const [radioValue, setRadioValue] = useState('am');
  const [isTimeError, setTimeError] = useState(false);

  const checkInData = JSON.parse(localStorage.getItem('checkInHistory'))
    .slice(0, 7)
    .reverse();

  const [open, setOpen] = useState(false);
  const chartData = checkInData.map(
    (item) => item.positiveCount + item.negativeCount
  );

  const [savedSuccessfully, setSavedSuccessfully] = useState(true);
  const xAxis = checkInData.map(
    (item) =>
      `${daysOfTheWeek[new Date(item.Date).getDay()]} ${new Date(
        item.Date
      ).getMonth()}/${new Date(item.Date).getDate()}`
  );
  const lineChartInfo = {
    labels: xAxis,
    datasets: [
      {
        label: 'Attendance',
        fill: false,
        lineTension: 0.5,
        backgroundColor: '#288bea',
        borderColor: '#288bea',
        borderWidth: 3,
        data: chartData,
      },
    ],
  };

  const lineChartOptions = {
    title: {
      display: true,
      text: 'Attendance for Past Seven Days',
      fontSize: 20,
    },
    legend: {
      display: false,
    },
  };

  useEffect(() => {
    getSettings()
      .then((res) => res.json())
      .then((response) => {
        setFormData({
          ...response,
          reservationClearOut: convertTo12Hour(response.reservationClearOut)[0],
        });
        setRadioValue(convertTo12Hour(response.reservationClearOut)[1]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleTextFieldChange = (e) => {
    setFormData({
      ...formData,
      [e.target.getAttribute('name')]: e.target.value,
    });
  };

  const handleRadioChange = (e) => {
    setRadioValue(e.target.value);
  };

  const handleTimeBlur = (e) => {
    setTimeError(e.target.value <= 1 || e.target.value >= 12);
  };

  const handleClick = () => {
    setSettings({
      ...formData,
      reservationClearOut: new Date(
        convertHourToIsoDate(formData.reservationClearOut, radioValue)
      ),
    }).catch((e) => {
      console.log(e);
      setSavedSuccessfully(false);
    });
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <BaseContainer>
      <AdminForm>
        <form>
          <StyledTextField
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            type="text"
            placeholder="e.g. Headstorm"
            name="companyName"
            value={formData.companyName}
            onChange={(e) => handleTextFieldChange(e)}
            label="Company Name"
          />
          <StyledTextField
            InputLabelProps={{
              shrink: true,
            }}
            type="number"
            name="occupancyRule"
            placeholder="e.g. 25"
            onChange={(e) => handleTextFieldChange(e)}
            value={formData.occupancyRule}
            fullWidth
            label="Occupancy Rule"
          />
          <StyledTextField
            InputLabelProps={{
              shrink: true,
            }}
            type="text"
            name="currentRules"
            placeholder="e.g. Rule 1, Rule 2, ..."
            onChange={(e) => handleTextFieldChange(e)}
            value={formData.currentRules}
            fullWidth
            label="Current Rules"
          />
          <StyledTextField
            InputLabelProps={{
              shrink: true,
            }}
            type="text"
            fullWidth
            placeholder="e.g. Have a good day!"
            onChange={(e) => handleTextFieldChange(e)}
            name="successMessage"
            value={formData.successMessage}
            label="Success Message"
          />
          <StyledNumberField
            type="number"
            name="reservationClearOut"
            label="Reservation Reset"
            onChange={(e) => handleTextFieldChange(e)}
            onBlur={(e) => handleTimeBlur(e)}
            error={isTimeError}
            helperText={!isTimeError || 'must be 1-12'}
            value={formData.reservationClearOut}
            InputProps={{ inputProps: { min: 0, max: 12 } }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <StyledRadioGroup
            name="amPm"
            row
            value={radioValue}
            onChange={(e) => handleRadioChange(e)}
          >
            <FormControlLabel value="am" control={<StyledRadio />} label="AM" />
            <FormControlLabel value="pm" control={<StyledRadio />} label="PM" />
          </StyledRadioGroup>
        </form>
      </AdminForm>
      <MiddleDiv>
        <Line data={lineChartInfo} options={lineChartOptions} />
      </MiddleDiv>
      <FooterDiv>
        <StyledSnackBar
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={open}
          onClose={handleClose}
        >
          {savedSuccessfully ? (
            <MuiAlert severity="success">Saved</MuiAlert>
          ) : (
            <MuiAlert severity="error">Error saving</MuiAlert>
          )}
        </StyledSnackBar>
        <StyledButton
          size="large"
          variant="contained"
          onClick={() => handleClick()}
        >
          Save
        </StyledButton>
      </FooterDiv>
    </BaseContainer>
  );
};

export default withRouter(Admin);
