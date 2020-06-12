import moment from 'moment'

export const changeDateFormat = date => {
    return moment(date, 'YYYY-MM-DD').format('MM-DD-YYYY')
}