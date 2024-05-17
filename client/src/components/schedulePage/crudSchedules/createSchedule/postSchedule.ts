import { SemesterType } from "@/types";
import { Params } from "react-router-dom";
interface postScheduleReturnType {
  message: string;
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
  try {
    const response = await fetch(`http://localhost:8000/schedules/`, options);
    if (!response.ok) {
      const errorData = await response.json();
      console.log(`Error: `, errorData.message);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(`Error: `, error);
  }
}
