interface deleteScheduleReturnType {
  message: string;
}
export default async function deleteScheduleById(
  scheduleId: string
): Promise<deleteScheduleReturnType> {
  try {
    const response = await fetch(
      `http://localhost:8000/schedules/${scheduleId}`,
      { method: "DELETE" }
    );
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
