import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getReservation } from '../services/apiCalls';
import { TextField, Icon, ListItemSecondaryAction, ListItemText, Typography, List, Button, Container, ListItem } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { STORAGE, PATHS } from '../common/constants';
import { changeDateFormat } from '../common/dateFormat';
import EventBusyOutlinedIcon from '@material-ui/icons/EventBusyOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
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
    expiredIcon: {
        textAlign: 'center',
        color: '#ff3d00',
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
    },
    styledIcon: {
        fontSize: '1rem'
    }
}));

const ViewReservations = (props) => {
    const [reservedDays, setReservedDays] = useState([]);
    const [reservationCode, setReservationCode] = useState();

    const compare = (a, b) => {
        if (a.resDate > b.resDate) return 1;
        if (b.resDate > a.resDate) return -1;

        return 0;
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
            })
    };


    const nextPath = (path) => {
        props.history.push(path);
    };

    const checkInTodaysReservation = (date) => {
        localStorage.setItem(STORAGE.RESERVATION_CODE, reservationCode);
        nextPath(PATHS.COVID_CHECK);
    }

    const hasCheckedInToday =
        localStorage.getItem(STORAGE.CHECK_IN_DATE) ===
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
                Object.values(reservedDays).map((reservation) => {
                    const labelId = `reservation-list-label-${reservation.resDate}`;
                    return (
                        <ListItem key={reservation.resDate} dense>
                            <ListItemSecondaryAction>
                                {isToday(reservation.resDate) && !hasCheckedInToday && !reservation.checkedIn && !reservation.expired &&
                                    <Button color="primary" onClick={() => { checkInTodaysReservation(reservation.resDate) }} >Check In</Button>
                                }
                                {isToday(reservation.resDate) && hasCheckedInToday && reservation.checkedIn &&
                                    <Icon className={classes.icon}>
                                        Checked In <CheckCircleIcon className={classes.styledIcon} />
                                    </Icon>
                                }
                                {isToday(reservation.resDate) && reservation.expired &&
                                    < Icon className={classes.expiredIcon}>
                                        Expired <EventBusyOutlinedIcon className={classes.styledIcon}></EventBusyOutlinedIcon>
                                    </Icon>
                                }

                            </ListItemSecondaryAction>
                            <ListItemText id={labelId} primary={`${reservation.resDate}`} />
                        </ListItem>
                    );
                })
            }
        </List >
    );

    return (
        <Container className={classes.root} >
            {reservedDays &&
                <ReservationList />
            }
            <TextField id="standard-basic"
                className={classes.textField}
                label="Reservation Code"
                value={reservationCode}
                onChange={(event) => { setReservationCode(event.target.value) }}
            />

            <Button variant="contained"
                className={classes.reservationButton}
                onClick={() => { getReservedDays(reservationCode) }}>
                View Reservations
            </Button>

            <Typography>You will only see a check in button if the reservation is for today.</Typography>

        </Container >
    );
}

export default withRouter(ViewReservations);