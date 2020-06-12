export const changeDateFormat = date => {
    var splitDate = date.split('-');
    if (splitDate.count === 0) {
        return null;
    }

    var year = splitDate[0];
    var month = splitDate[1];
    var day = splitDate[2];

    return month + '-' + day + '-' + year;
}