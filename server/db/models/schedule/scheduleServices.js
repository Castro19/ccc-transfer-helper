import * as scheduleModel from "./scheduleModel.js";

// Create (save)
export const addSchedule = async (scheduleData) => {
  try {
    const result = await scheduleModel.createSchedule(scheduleData);
    console.log("Result: ", result);
    return {
      message: "Schedule Posted successfully",
    };
  } catch (error) {
    throw new Error("Service error: " + error.message);
  }
};
