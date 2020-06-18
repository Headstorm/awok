import React, { useState } from 'react';
import { Button, Container, TextField, Grid, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import { getReservation } from '../services/apiCalls';
import { changeDateFormat } from '../common/dateFormat';
import { PATHS, STORAGE } from '../common/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  styledButton: {
    marginBottom: '1rem',
    padding: '.5rem 1.375rem',
    'grid-row-start': 2,
    'grid-column-start': 2,
    'justify-self': 'center',
    width: '50%',
    '@media (max-width:425px)': { width: '100%' },
  }
}));

const ReservationCheck = (props) => {
  const classes = useStyles();

  const [reservedDays, setReservedDays] = useState([]);
  const [reservationError, setReservationError] = useState({});
  const [reservationCode, setReservationCode] = useState();
  const nextPath = (path) => {
    props.history.push(path);
  };

  const compare = (a, b) => {
    if (a.resDate > b.resDate) return 1;
    if (b.resDate > a.resDate) return -1;

    return 0;
  }

  const checkInTodaysReservation = () => {
    localStorage.setItem(STORAGE.RESERVATION_CODE, reservationCode);
    nextPath(PATHS.COVID_CHECK);
}

  const isToday = (date) => {
    const today = new Date();
    const value = new Date(date);

    return value.getDate() === today.getDate() &&
      value.getMonth() === today.getMonth() &&
      value.getFullYear() === today.getFullYear();
  };

  const getTodaysReservation = () => {
    return reservedDays.find((res) => {
      if (isToday(res.resDate)) {
        return res;
      }
    })
  }

  const isReservationValidToday = () => {
    const today = getTodaysReservation();
    if (today) {
      if (today.expired) {
        return setReservationError({ error: true, helperText: 'This code is invalid. Try again.' });
      }
      checkInTodaysReservation();
    }
    return setReservationError({ error: true, helperText: 'This code is invalid. Try again.' });
  }

  const getReservedDays = (reservationRetrievalCode) => {
    getReservation(reservationRetrievalCode)
      .then((res) => res.json())
      .then((response) => {
        const resps = response.map((res) => {
          return {
            ...res,
            resDate: changeDateFormat(res.resDate)
          }
        });
        resps.sort(compare);
        setReservedDays(resps);
        isReservationValidToday();
      })
  };

  return (
    <Container >
      <Grid className={classes.root} container spacing={3}>
        <Grid item>
          <Typography variant="h6">
            Enter your reservation code
        </Typography>
        </Grid>
        <Grid item>
          <TextField id="standard-basic"
            className={classes.textField}
            error={reservationError.error}
            label="Reservation Code"
            size="small"
            value={reservationCode}
            variant="outlined"
            helperText={reservationError.helperText}
            onChange={(event) => {
              setReservationCode(event.target.value)
            }}
          />
        </Grid>
        <Grid item>
          <Button disabled={!reservationError.error}
            color="primary"
            size="small"
            className={classes.styledButton}
            onClick={() => { nextPath(PATHS.COVID_CHECK) }}>
            Return to regular checkin
        </Button>
          <Button variant="contained"
            disabled={reservationError.error && reservationCode}
            color="primary"
            size="normal"
            className={classes.styledButton}
            onClick={() => {
              getReservedDays(reservationCode)
            }}>
            Continue
        </Button>

        </Grid>
      </Grid>
    </Container>
  );
};

export default withRouter(ReservationCheck);
