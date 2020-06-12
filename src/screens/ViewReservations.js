import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getReservation } from '../services/apiCalls';
import { TextField, withStyles, Icon, ListItemSecondaryAction, ListItemText, Typography, List, Button, Container, ListItem } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles((theme) => ({
    root: {
        // margin: theme.spacing(6, 0, 3),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    reservationList: {
        width: '50%',
        '@media (max-width:425px)': { width: '100%' },
    },
    textField: {
        marginBottom: '1rem',
        width: '50%',
        '@media (max-width:425px)': { width: '100%' },
    },
    icon: {
        textAlign: 'center',
        color: '#25db47',
        fontSize: '1rem'
    },
    reservationButton: {
        color: '#FFFFFF',
        backgroundColor: '#518DFD',
        marginBottom: '1rem',
        padding: '.5rem 1.375rem',
        'grid-row-start': 2,
        'grid-column-start': 2,
        'justify-self': 'center',
        width: '50%',
        '@media (max-width:425px)': { width: '100%' },
    }
}));

const StyledIcon = withStyles(() => ({
    root: {
      fontSize: '1rem',
    },
  }))(CheckCircleIcon);


const ViewReservations = (props) => {
    const [reservedDays, setReservedDays] = useState([]);
    const [reservationCode, setReservationCode] = useState();

    const getReservedDays = (reservationRetrievalCode) => {
        getReservation(reservationRetrievalCode)
            .then((res) => res.json())
            .then((response) => {
                const resps = response.map(res => res.resDate);
                setReservedDays(resps);
            })
    };

    const nextPath = (path) => {
        props.history.push(path);
    };

    const checkInTodaysReservation = (date) => {
        console.log("checking in" + date);
        localStorage.setItem('reservationCode', reservationCode);
        nextPath('/covid-check');
    }

    const hasCheckedInToday =
        localStorage.getItem('checkInDate') ===
        new Date().toISOString().slice(0, 10);

    const classes = useStyles();

    const isToday = (date) => {
        const today = new Date();
        const value = new Date(date);

        return value.getDate() === today.getDate() &&
            value.getMonth() === today.getMonth() &&
            value.getFullYear() === today.getFullYear();
    };

    const ReservationList = () => (
        <List className={classes.reservationList}>
            {
                Object.values(reservedDays).map((value) => {
                    const labelId = `reservation-list-label-${value}`;

                    return (
                        <ListItem key={value} role={undefined} dense>
                            <ListItemSecondaryAction>
                                {isToday(value) && !hasCheckedInToday &&
                                    <Button color="primary" onClick={() => { checkInTodaysReservation(value) }} >Check In</Button>
                                }
                                {isToday(value) && hasCheckedInToday &&
                                    <Icon className={classes.icon}>
                                       Checked In <StyledIcon />
                                    </Icon>
                                }
                            </ListItemSecondaryAction>
                            <ListItemText id={labelId} primary={`${value}`} />
                        </ListItem>
                    );
                })
            }
        </List>
    );

    return (
        <Container className={classes.root} >
            {reservedDays &&
                <ReservationList />
            }
            <TextField id="standard-basic" className={classes.textField} label="Reservation Code" value={reservationCode} onChange={(event) => { setReservationCode(event.target.value) }} />

            <Button variant="contained" className={classes.reservationButton} onClick={() => { getReservedDays(reservationCode) }}>
                Get Reservations
            </Button>

            <Typography>You will only see a check in button if the reservation is for today.</Typography>

        </Container >
    );
}

export default withRouter(ViewReservations);