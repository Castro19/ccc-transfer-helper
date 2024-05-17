import { promises as fs } from "fs";

export default function organizeClasses(data) {
  let subjects = {};

  for (const key in data) {
    const term = data[key];

    for (const course of term.courses) {
      if (!course.subject) continue;

      if (!subjects[course.subject]) {
        subjects[course.subject] = [];
      }
      //   Check if we have multiple classes
      if (course.course instanceof Array) {
        for (const additionalCourse of course.course) {
          subjects[course.subject].push({
            course: additionalCourse,
            units: course.units,
          });
        }
      } else {
        subjects[course.subject].push({
          course: course.course,
          units: course.units,
        });
      }
    }
  }
  return subjects;
}

export async function getClassList(ccc) {
  const rawData = await fs.readFile(
    `json_data/ccc_courses/${ccc}.json`,
    "utf8"
  );
  const classList = JSON.parse(rawData);
  return classList.courses;
}

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

export async function getSchedule(
  scheduleFilePath = "json_data/schedules/ideal-schedule-format.json"
) {
  const rawData = await fs.readFile(scheduleFilePath, "utf8");

  const scheduleData = JSON.parse(rawData);

  return scheduleData;
}
