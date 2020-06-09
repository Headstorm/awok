import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(2),
    },
  },
}));

const Reservation = props => {
	const classes = useStyles();
  return (
		<div className={classes.root}>
		<ButtonGroup size="large" variant="contained" color="primary" aria-label="contained primary button">
			<Button>M</Button>
			<Button>T</Button>
			<Button>W</Button>
			<Button>T</Button>
			<Button>F</Button>
    </ButtonGroup>
		<ButtonGroup size="large" variant="contained" color="primary" aria-label="contained primary button">
			<Button>M</Button>
			<Button>T</Button>
			<Button>W</Button>
			<Button>T</Button>
			<Button>F</Button>
    </ButtonGroup>
		</div>
	) 
}

export default Reservation;