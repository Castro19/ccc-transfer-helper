import { SemesterType } from "@/types";
import { Params } from "react-router-dom";
interface postScheduleReturnType {
  message: string;
  scheduleId: string;
}

export default async function postSchedule(
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
  const response = await fetch(`http://localhost:8000/schedules/`, options);
  const responseData = await response.json();

  if (!response.ok) {
    console.log(`Error: `, responseData.message);
  }
  return responseData;
}
