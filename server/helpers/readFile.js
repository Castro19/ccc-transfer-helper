import { promises as fs } from "fs";

export function getFileName(major, ccc) {
  let degreeType = "";
  let majorFilename = major.split(",")[0].split(" ").join("_");
  if (major.includes("PHYSICS")) {
    degreeType = major.split(",")[1].replaceAll(/[.\s]/g, "");
    majorFilename = `${majorFilename}_${degreeType}`;
  }
  const filePath = `json_data/ccc_schedules/${ccc}/${majorFilename}.json`;

  return filePath;
}

export async function getClassList(ccc) {
  const rawData = await fs.readFile(
    `json_data/ccc_courses/${ccc}.json`,
    "utf8"
  );
  const classList = JSON.parse(rawData);
  return classList.courses;
}

export async function getSchedule(
  scheduleFilePath = "json_data/schedules/ideal-schedule-format.json"
) {
  const rawData = await fs.readFile(scheduleFilePath, "utf8");

  const scheduleData = JSON.parse(rawData);

  return scheduleData;
}

export async function getGE(ccc) {
  const filePath = `json_data/GE/${ccc}.json`;
  const rawData = await fs.readFile(filePath, "utf8");
  const dataGE = JSON.parse(rawData);

  return dataGE;
}
