interface fetchScheduleDataParams {
  params: {
    userId: string;
  };
}

async function fetchSchedules({ params }: fetchScheduleDataParams) {
  console.log("PARAMS:", params);

  const { userId } = params;

  try {
    const response = await fetch(`http://localhost:8000/schedules/${userId}/`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error("" + errorData.message);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error("Failed to fetch schedule data");
  }
}
export default fetchSchedules;
