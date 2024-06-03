import { LoaderFunction } from "react-router-dom";

const fetchSchedules: LoaderFunction = async (args) => {
  const { params } = args;
  console.log("PARAMS:", params);

  const { userId } = params;

  try {
    const response = await fetch(
      `https://ccc-transfers.azurewebsites.net/schedules/${userId}/`
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error("" + errorData.message);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error("Failed to fetch schedule data");
  }
};

export default fetchSchedules;
