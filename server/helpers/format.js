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
