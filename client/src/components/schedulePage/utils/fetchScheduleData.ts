// Assuming fetchScheduleData is an async function that fetches data from an API
async function fetchScheduleData({ params }) {
  const { ccc, college, major } = params;
  try {
    const response = await fetch(
      `http://localhost:8000/schedules/${ccc}/${college}/${major}/`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch schedule data");
  }
}
export default fetchScheduleData;
