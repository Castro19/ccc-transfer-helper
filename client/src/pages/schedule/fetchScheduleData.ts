import { LoaderFunction } from "react-router-dom";

export const fetchScheduleData: LoaderFunction = async (args) => {
  const { params } = args;
  console.log("PARAMS:", params);
  const { cccCode, college, major } = params;
  try {
    const response = await fetch(
      `http://localhost:8000/schedules/${cccCode}/${college}/${major}/`
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch schedule data");
  }
};

// This type assumes 'params' is directly under the first argument as required by react-router
export const loadScheduleData: LoaderFunction = async (args) => {
  // Extract params directly inside the function to adhere to type expectations
  const { params } = args;
  const { id } = params;

  try {
    const response = await fetch(
      `http://localhost:8000/schedules/savedSchedule/${id}`
    );
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error(`Failed to fetch schedule data: ${id}`);
  }
};
