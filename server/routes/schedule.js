import express from "express";
// MongoDB service functions
import {
  addSchedule,
  deleteSchedule,
  updateSchedule,
  fetchSchedules,
  fetchScheduleById,
} from "../db/models/schedule/scheduleServices.js";
// Helpers
import organizeClasses from "../helpers/format.js";
import {
  getFileName,
  getClassList,
  getSchedule,
  getGE,
} from "../helpers/readFile.js";

const router = express.Router();

router.get("/:ccc/:college/:major/", async (req, res) => {
  let result = {};
  try {
    const { ccc, college, major } = req.params;
    // Testing
    console.log(`Server Side: ${ccc}, ${college}, ${major}`);

    // Format the major name to represent
    console.log("MAJOR FILE NAME: ", getFileName(major, ccc));
    const scheduleData = await getSchedule();
    console.log("SCHEDULE EEE DATA: ", scheduleData);
    result["schedule"] = scheduleData;
    result["subjectClasses"] = organizeClasses(scheduleData);
    result["classList"] = await getClassList(ccc);
    result["ge"] = await getGE(ccc);
    res.send(result);
  } catch (error) {
    console.error("Error fetching university data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/savedSchedule/:id", async (req, res) => {
  const { id } = req.params;
  console.log("ID:", id);
  let result = {};
  try {
    const savedSchedule = await fetchScheduleById(id);
    const { cccCode } = savedSchedule.params;
    const scheduleData = await getSchedule();

    result["schedule"] = scheduleData;
    result["subjectClasses"] = organizeClasses(scheduleData);
    result["classList"] = await getClassList(cccCode);
    result["ge"] = await getGE(cccCode);
    result["savedSchedule"] = savedSchedule;
    res.send(result);
  } catch (error) {
    console.error(`Error finding schedule ${id}:`, error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  const scheduleData = req.body;
  console.log("BODY: ", scheduleData);
  if (!scheduleData.userId) {
    res
      .status(400)
      .json({ message: "User needs to be signed in to save a schedule" });
    return;
  }
  try {
    const result = await addSchedule(scheduleData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send("Failed to create Schedule: " + error.message);
    console.error("Failed to create Schedule: ", error);
  }
});

// Check user is signed in
router.post("/:scheduleId", async (req, res) => {
  const { scheduleId } = req.params;
  const { schedule, userId } = req.body;
  console.log("UPDATING SCHEDULE: ", scheduleId);
  try {
    const result = await updateSchedule(scheduleId, schedule, userId);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send("Failed to UPDATE Schedule: " + error.message);
    console.error("Failed to UPDATE Schedule: ", error);
  }
});

router.delete("/:scheduleId", async (req, res) => {
  const { scheduleId } = req.params;
  console.log("Schedule ID: ", scheduleId);
  try {
    await deleteSchedule(scheduleId);
    res.status(200).json({ message: `Schedule ID (${scheduleId}) is deleted` });
  } catch (error) {
    res.status(500).send("Failed to Delete Schedule: " + error.message);
    console.error("Failed to Delete Schedule: ", error);
  }
});

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const scheudles = await fetchSchedules(userId);
    res.status(200).json(scheudles);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router;
