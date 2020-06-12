import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import apiCalls from '../services/apiCalls';
import { TextField, Container } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        // margin: theme.spacing(6, 0, 3),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
}));

const getReservations = (reservationRetrievalCode) => {
    
};

export default function ViewReservations() {
    const classes = useStyles();

    return (
        <Container classname={classes.root}>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" label="Standard" />
            </form>
                {/* <Typography className={classes.root} color="textSecondary">
                    Pro tip: See more{' '}
                    <Link href="https://material-ui.com/getting-started/templates/">templates</Link> on the
        Material-UI documentation.
        </Typography> */}
        </Container>
    );
}