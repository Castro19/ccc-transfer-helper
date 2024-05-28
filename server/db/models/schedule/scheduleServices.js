import * as scheduleModel from "./scheduleModel.js";

// Create (save)
export const addSchedule = async (scheduleData) => {
  try {
    const result = await scheduleModel.createSchedule(scheduleData);
    console.log("Result: ", result);
    return {
      message: "Schedule Posted successfully",
      scheduleId: result.insertedId,
    };
  } catch (error) {
    throw new Error("Service error: " + error.message);
  }
};

// Read (fetching schedules from user)
export const fetchSchedules = async (userId) => {
  try {
    const result = await scheduleModel.fetchSchedulesByUserId(userId);
    return result;
  } catch (error) {
    throw new Error("Service error: " + error.message);
  }
};

// read
export const fetchScheduleById = async (scheduleId) => {
  try {
    const result = await scheduleModel.getSchedule(scheduleId);
    return result;
  } catch (error) {
    throw new Error("Service error: " + error.message);
  }
};

// Update
export const updateSchedule = async (scheduleId, schedule, userId) => {
  try {
    const result = await scheduleModel.putSchedule(
      scheduleId,
      schedule,
      userId
    );
    return result;
  } catch (error) {
    throw new Error("Service error: " + error.message);
  }
};

// Delete
export const deleteSchedule = async (scheduleId) => {
  try {
    await scheduleModel.deleteScheduleById(scheduleId);
  } catch (error) {
    throw new Error("Service error: " + error.message);
  }
};
