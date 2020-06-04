export const patchCheckIn = (TestedPositive) => {
  fetch(
    `https://crhs49zgsk.execute-api.us-east-2.amazonaws.com/default/project-reckoning/employee-count?TestedPositive=${TestedPositive}`,
    {
      method: "PATCH",
      mode: "cors",
    }
  );
};

export const getCheckInCounts = async () =>
  fetch(
    "https://crhs49zgsk.execute-api.us-east-2.amazonaws.com/default/project-reckoning/employee-count",
    {
      mode: "cors",
    }
  );
