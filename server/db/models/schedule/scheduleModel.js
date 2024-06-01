import db from "../../connection.js";
import { ObjectId } from "mongodb";

const scheduleCollection = db.collection("schedule");

// Create
export const createSchedule = async (scheduleData) => {
  try {
    return await scheduleCollection.insertOne(scheduleData);
  } catch (error) {
    throw new Error("Error Saving Schedule: " + error.message);
  }
};

// Read (fetch all schedules associated w/ a user )
export const fetchSchedulesByUserId = async (userId) => {
  try {
    const query = {
      userId: userId,
    };
    return await scheduleCollection.find(query).toArray();
  } catch (error) {
    throw new Error("Error Fetching Schedule: " + error.message);
  }
};

export const getSchedule = async (scheduleId) => {
  try {
    return await scheduleCollection.findOne({
      _id: new ObjectId(scheduleId),
    });
  } catch (error) {
    throw new Error(
      `Error Fetching Schedule (${scheduleId}): ` + error.message
    );
  }
};

export const putSchedule = async (scheduleId, schedule, userId) => {
  try {
    const result = await scheduleCollection.updateOne(
      {
        _id: new ObjectId(scheduleId),
        userId: userId, // Ensure only the owner can update
      },
      {
        $set: {
          schedule: schedule,
        },
      }
    );
    if (result.matchedCount === 0) {
      throw new Error(
        "No schedule found with the provided ID, or you do not have permission to update this schedule."
      );
    }
    return result;
  } catch (error) {
    throw new Error(
      `Error Fetching Schedule (${scheduleId}): ` + error.message
    );
  }
};

export const deleteScheduleById = async (scheduleId) => {
  try {
    const result = await scheduleCollection.deleteOne({
      _id: new ObjectId(scheduleId),
    });
    if (result.deletedCount === 0) {
      throw new Error(
        "No secret found with the provided ID, or you do not have permission to delete this secret."
      );
    }
    return result;
  } catch (error) {
    throw new Error("Error Deleting Secret: " + error.message);
  }
};
