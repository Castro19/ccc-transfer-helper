interface fetchScheduleDataParams {
  params: {
    cccCode: string;
    college: string;
    major: string;
  };
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function fetchScheduleData({ params }: fetchScheduleDataParams) {
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
}

type loadScheduleDataParams = {
  params: {
    id: string;
  };
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function loadScheduleData({ params }: loadScheduleDataParams) {
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
}
