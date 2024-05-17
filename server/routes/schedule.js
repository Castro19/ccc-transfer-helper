import express from "express";
import { addSchedule } from "../db/models/schedule/scheduleServices.js";
import organizeClasses, {
  getClassList,
  getFileName,
  getSchedule,
} from "./utils.js";
const router = express.Router();

router.get("/:ccc/:college/:major/", async (req, res) => {
  let result = {};
  try {
    const { ccc, college, major } = req.params;
    // Testing
    // console.log(`Server Side: ${ccc}, ${college}, ${major}`);

    // Format the major name to represent
    console.log("MAJOR FILE NAME: ", getFileName(major, ccc));
    const scheduleData = await getSchedule();
    result["schedule"] = scheduleData;
    result["subjectClasses"] = organizeClasses(scheduleData);
    result["classList"] = await getClassList(ccc);
    res.send(result);
  } catch (error) {
    console.error("Error fetching university data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  const scheduleData = req.body;
  console.log("BODY: ", scheduleData);
  if (scheduleData.userId === null) {
    res.status(400).json({ message: "User needs to be signed in!" });
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

router.get("/", async (req, res) => {
  res.json({ message: "Working" });
});

export default router;
