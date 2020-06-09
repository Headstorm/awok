import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, withStyles } from '@material-ui/core';

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

const ReserveButton = withStyles(() => ({
  root: {
    color: '#FFFFFF',
    backgroundColor: '#518DFD',
  },
}))(Button);

const Reservation = props => {
	const classes = useStyles();
	const [variant, setVariant] = useState(false);
  return (
		<div className={classes.root}>
			<label>Week of</label>
		<ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
			<Button onClick={() => setVariant(!variant)} variant={variant ? 'contained' : ''}>M</Button>
			<Button>T</Button>
			<Button>W</Button>
			<Button>T</Button>
			<Button>F</Button>
    </ButtonGroup>
		<label>Week of</label>
		<ButtonGroup size="large" variant="contained" color="primary" aria-label="contained primary button">
			<Button>M</Button>
			<Button>T</Button>
			<Button>W</Button>
			<Button>T</Button>
			<Button>F</Button>
    </ButtonGroup>
		<h4>Selected Days</h4>
		<form noValidate>
				<TextField
				  id="outlined-basic"
					label="Reservation Name"
					variant="outlined"
				/>
		</form>
		<ReserveButton
			size="large"
			variant="contained"
			onClick={() => {}}
		>
      Reserve
		</ReserveButton>
		</div>
	) 
}

export default Reservation;