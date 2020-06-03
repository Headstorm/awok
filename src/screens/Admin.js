import React, { useState } from 'react';
import { TextField, Button, Snackbar } from '@material-ui/core';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const BaseContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: space-between;
`;

const TitleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d96239;
  color: #ffffff;
  height: 6rem;
`;

const AdminForm = styled.div`
  margin: 3rem 2rem 0rem 2rem;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 1rem !important;
`;

const FooterDiv = styled.div`
  display: flex;
  flex: 3;
  justify-content: flex-end;
`;

const StyledButton = styled(Button)`
  align-self: flex-end;
  margin-bottom: 5rem !important;
  margin-right: 2rem !important;
  background-color: #288bea !important;
  color: #ffffff !important;
`;

const Admin = (props) => {
  const [formData, setFormData] = useState({
    companyName: '',
    occupancyRule: '',
    currentRules: '',
    successMessage: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.getAttribute('name')]: e.target.value,
    });
  };

  return (
    <BaseContainer>
      <TitleHeader>
        <h1>Admin Settings</h1>
      </TitleHeader>
      <AdminForm>
        <form>
          <StyledTextField
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
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
            name="currentRules"
            placeholder="e.g. Rule 1: ..., Rule 2: ..., Rule 3: ..."
            onChange={(e) => handleChange(e)}
            value={formData.currentRules}
            fullWidth
            label="Current Rules"
          />
          <StyledTextField
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            placeholder="e.g. Have a good day!"
            onChange={(e) => handleChange(e)}
            name="successMessage"
            value={formData.successMessage}
            label="Success Message"
          />
        </form>
      </AdminForm>
      <FooterDiv>
        <Snackbar open />
        <StyledButton size="large" variant="contained">
          Save
        </StyledButton>
      </FooterDiv>
    </BaseContainer>
  );
};

export default withRouter(Admin);
