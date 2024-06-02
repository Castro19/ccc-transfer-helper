/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Univ } from "@/types";
export async function fetchColleges(): Promise<Univ[]> {
  try {
    const response = await fetch("REACT_APP_API_URL/agreements");
    if (!response.ok) {
      throw new Error("Error fetching Community College Classes");
    }

    const data: Univ[] = await response.json();

    return data;
  } catch (error) {
    console.error("Problem Fetching CCCs: ", error);
    return [];
  }
}

export default async function fetchUnivsById(ccc_info: Univ | string) {
  try {
    const response = await fetch(
      `REACT_APP_API_URL/agreements/${ccc_info["code"]}_${ccc_info["id"]}/`
    );
    if (!response.ok) {
      throw new Error("University Section Newtwork Problem");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem fetching university data:", error);
  }
}

export async function fetchMajors(ccc_info: Univ | string, univ_info: Univ) {
  try {
    const response = await fetch(
      `REACT_APP_API_URL/agreements/${ccc_info["code"]}_${ccc_info["id"]}/${univ_info["code"]}_${univ_info["id"]}/`
    );
    if (!response.ok) {
      throw new Error("Trouble Fetching list of majors");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching data for majors: ", error);
  }
}

function getPDFUrl(key: string | number): string {
  if (typeof key === "number") {
    return `https://assist.org/transfer/report/${key}`;
  } else {
    const parts = key.split("/");
    if (parts.length === 6) {
      const [year, agreement, , institution] = parts;
      return `https://assist.org/transfer/results?year=${year}&institution=${institution}&agreement=${agreement}&agreementType=from&view=agreement&viewBy=major&viewSendingAgreements=false&viewByKey=${encodeURIComponent(
        key
      )}`;
    } else {
      throw new Error("Invalid key format");
    }
  }
}

export async function fetchPDF(key: string | number) {
  try {
    const url = getPDFUrl(key);
    window.open(url, "_blank"); // Opens the URL in a new tab/window
  } catch (error) {
    console.error("Error opening PDF:", error);
    alert("Failed to open PDF due to an invalid key format."); // Provide user feedback
  }
}
