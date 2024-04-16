// In a React component
export default async function fetchUnivsById(id: number | null) {
  try {
    const response = await fetch(
      `http://localhost:8000/assist_api/univs/${id}/`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data["data"];
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}
