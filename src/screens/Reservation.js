import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { TextField, Divider, withStyles } from '@material-ui/core';
import styled from "styled-components";

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const BaseContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const DaySelectionContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: .5rem;
`;

const ReserveButton = withStyles(() => ({
	root: {
		color: '#FFFFFF',
		backgroundColor: '#518DFD',
		width: '30%',
		margin: '1rem',
		"@media (max-width:425px)": { width: "75%" },
	},
}))(Button);

const StyledButtonGroup = withStyles(() => ({
	root: {
		margin: '.5rem .5rem 1rem .5rem',
	}
}))(ButtonGroup)

const Form = styled.form`
	width: 30%;
	margin-top: 1rem;
	@media (max-width:425px) {
		width: 75%;
	},
`;

const StyledTextField = withStyles(() => ({
	root: {
		width: '100%',
	}
}))(TextField)

const StyledDivider = withStyles(() => ({
	root: {
		width: '35%',
		margin: 0,
		"@media (max-width:425px)": { width: "80%" },
	}
}))(Divider)

const SelectedDays = styled.p`
	margin: .5rem;
	width: 30%;
	@media (max-width:425px) {
		width: 80%;
	},
`;

const StyledPressedButton = withStyles(() => ({
	root: {
		padding: '.5rem 1.5rem',
		'background-color': '#518DFD',
	}
}))(Button)

const StyledUnpressedButton = withStyles(() => ({
	root: {
		padding: '.5rem 1.5rem',
		'background-color': '#FFFFFF'
	}
}))(Button)

const Reservation = props => {
	const [storedDays, setStoredDays] = useState([]);
	const [reservationCode, setReservationCode] = useState('');

	const getSpecificDay = (numDay) => (new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + numDay)).toISOString().slice(0, 10))

	const getReadableDay = dateToConvert => {
		const [month, numDay] = dateToConvert.slice(5).split('-')
		return MONTHS[parseInt(month - 1)] + ' ' + numDay;
	}

	const today = new Date().toISOString().slice(0, 10)

	const firstWeek = getReadableDay(getSpecificDay(1))
	const firstWeekEnd = getReadableDay(getSpecificDay(5))
	const secondWeek = getReadableDay(getSpecificDay(8))
	const secondWeekEnd = getReadableDay(getSpecificDay(12))

	const getButtons = startDay => {
		return ['M','T','W','T','F'].map((d, x) => {
			const storeValue = getSpecificDay(x + startDay)
			const Button = storedDays.includes(storeValue) ? StyledPressedButton : StyledUnpressedButton;
			return (
				<Button
					key={storeValue}
					onClick={() => {
						if (storedDays.includes(storeValue)) {
							setStoredDays(storedDays.filter(day => day !== storeValue))
						} else {
							setStoredDays([...storedDays, storeValue])
						}
					}}
					variant={storedDays.includes(storeValue) ? 'contained' : ''}
					disabled={storeValue < today}
				>
					{d}
				</Button>
			)
		})
	}

  return (
		<BaseContainer>
			<DaySelectionContainer>
				<h2>Reserve your days</h2>
				<label>Week of {firstWeek} - {firstWeekEnd}</label>
				<StyledButtonGroup size="large" color="primary" aria-label="large outlined primary button">
					{getButtons(1)}
				</StyledButtonGroup>
				<label>Week of {secondWeek} - {secondWeekEnd}</label>
				<StyledButtonGroup size="large" color="primary" aria-label="large outlined primary button">
					{getButtons(8)}
				</StyledButtonGroup>
			</DaySelectionContainer>
			<SelectedDays><b>Selected Days</b></SelectedDays>
			<StyledDivider variant="middle" />
			<SelectedDays>{storedDays.sort().map(d => getReadableDay(d)).join(', ')}</SelectedDays>
			<Form noValidate>
					<StyledTextField
						id="outlined-basic"
						label="Reservation Retrival Code"
						variant="outlined"
						onChange={(e) => setReservationCode(e.target.value)}
					/>
			</Form>
			<ReserveButton
				disabled={!(storedDays.length && reservationCode.length)}
				size="large"
				variant="contained"
				onClick={() => console.log(storedDays, reservationCode)}
			>
				Reserve
			</ReserveButton>
		</BaseContainer>
	) 
}

export default Reservation;