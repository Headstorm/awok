export const patchCheckIn = async (TestedPositive) => {
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

export const getSettings = async () =>
  fetch(
    'https://yt6g0s41t1.execute-api.us-east-1.amazonaws.com/Prod/settings/Headstorm',
    { mode: 'cors' }
  );

export const setSettings = async (settings) =>
  fetch(
    'https://yt6g0s41t1.execute-api.us-east-1.amazonaws.com/Prod/settings',
    {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(settings),
    }
  );
