import React, { useState, useEffect } from 'react';
import { TextField, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { getSettings, setSettings } from '../apiCalls';
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
  });

  const [open, setOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [chartData, setChartData] = useState([0, 5, 16, 6, 8, 25, 0, 0]);
  const [savedSuccessfully, setSavedSuccessfully] = useState(true);

  const lineChartInfo = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
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
      text: 'Attendance for Date - Date',
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
