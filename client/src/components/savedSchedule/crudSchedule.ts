import { SemesterType } from "@/types";
import { Params } from "react-router-dom";
interface postScheduleReturnType {
  message: string;
  scheduleId: string;
}

export async function postSchedule(
  userId: string,
  schedule: SemesterType[],
  params: Readonly<Params<string>>
): Promise<postScheduleReturnType> {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      schedule,
      params,
    }),
  };
  const response = await fetch(`REACT_APP_API_URL/schedules/`, options);
  const responseData = await response.json();

  if (!response.ok) {
    console.log(`Error: `, responseData.message);
  }
  return responseData;
}
export async function updateSchedule(
  userId: string,
  schedule: SemesterType[],
  params: Readonly<Params<string>>
): Promise<postScheduleReturnType> {
  console.log("PARAMSSS: ", params);
  const scheduleId = params.id;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      schedule,
      scheduleId,
    }),
  };
  const response = await fetch(
    `REACT_APP_API_URL/schedules/${scheduleId}`,
    options
  );
  const responseData = await response.json();

  if (!response.ok) {
    console.log(`Error: `, responseData.message);
  }
  return responseData;
}

interface deleteScheduleReturnType {
  message: string;
}
export async function deleteScheduleById(
  scheduleId: string
): Promise<deleteScheduleReturnType> {
  try {
    const response = await fetch(`REACT_APP_API_URL/schedules/${scheduleId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error("" + errorData.message);
    }
    const responseData = await response.json();
    setTimeout(() => console.log("HELLO"), 1000);
    return responseData;
  } catch (error) {
    console.log(`Error: `);
  }
}
