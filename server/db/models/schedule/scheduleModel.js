import db from "../../connection.js";
import { ObjectId } from "mongodb";

const scheduleCollection = db.collection("schedule");

export const createSchedule = async (scheduleData) => {
  try {
    return await scheduleCollection.insertOne(scheduleData);
  } catch (error) {
    throw new Error("Error Saving Schedule: " + error.message);
  }
};
