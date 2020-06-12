import React, { useState, useEffect } from 'react';
import { TextField, Button, Snackbar } from '@material-ui/core';
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

const Admin = (props) => {
  const [formData, setFormData] = useState({
    companyName: '',
    occupancyRule: '',
    currentRules: '',
    successMessage: '',
    reservationClearOut: '00:00',
  });

  const checkInData = JSON.parse(localStorage.getItem('checkInHistory'))
    .slice(0, 7)
    .reverse();

  const daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
      text: 'Attendance for The Last Seven Days',
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
        setFormData(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.getAttribute('name')]: e.target.value,
    });
  };

  const handleTimeChange = (e) => {
    // we expect api to return a UTC formatted date time, so we convert to current timezone for display purposes
    // here we switch back to UTC because that is also how we save it in state
    const currentTime = new Date();
    const year = currentTime.getFullYear();
    const month = ('0' + (currentTime.getMonth() + 1)).slice(-2);
    const day = currentTime.getDate();
    const convertedTimeObject = new Date(
      `${year}-${month}-${day}T${e.target.value}`
    ).toUTCString();
    setFormData({
      ...formData,
      [e.target.getAttribute('name')]: convertedTimeObject,
    });
  };

  const handleClick = () => {
    setSettings(formData)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
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
            onChange={(e) => handleChange(e)}
            label="Company Name"
          />
          <StyledTextField
            InputLabelProps={{
              shrink: true,
            }}
            type="number"
            name="occupancyRule"
            placeholder="e.g. 25"
            onChange={(e) => handleChange(e)}
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
            onChange={(e) => handleChange(e)}
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
            onChange={(e) => handleChange(e)}
            name="successMessage"
            value={formData.successMessage}
            label="Success Message"
          />
          <StyledTextField
            InputLabelProps={{
              shrink: true,
            }}
            type="time"
            fullWidth
            onChange={(e) => handleTimeChange(e)}
            label="Reservation Clear Out Time"
            name="reservationClearOut"
            value={new Date(formData.reservationClearOut).toLocaleString(
              'en-US',
              {
                hour: 'numeric',
                minute: 'numeric',
                hour12: false,
              }
            )}
          />
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
