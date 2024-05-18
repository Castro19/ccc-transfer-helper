import express from "express";
import { promises as fs } from "fs";
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

router.get("/", async (req, res) => {
  res.send("Working");
});

export default router;
