export const patchCheckIn = (TestedPositive) => {
  fetch(
    `https://yt6g0s41t1.execute-api.us-east-1.amazonaws.com/Prod/employee-count?TestedPositive=${TestedPositive}`,
    {
      method: 'PATCH',
      mode: 'cors',
    }
  );
};

export const getCheckInCounts = async () =>
  fetch(
    'https://yt6g0s41t1.execute-api.us-east-1.amazonaws.com/Prod/employee-count',
    {
      mode: 'cors',
    }
  );
