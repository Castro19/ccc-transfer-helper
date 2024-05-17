import express from "express";
import { promises as fs } from "fs";
import organizeClasses, { getFileName } from "./utils.js";
const router = express.Router();

router.get("/:ccc/:college/:major/", async (req, res) => {
  let result = {};
  try {
    const { ccc, college, major } = req.params;
    // Format the major name to represent
    const majorFilename = major.split(",")[0].split(" ").join("_");

    console.log("MAJOR FILE NAME: ", getFileName(major, ccc));

    console.log(`Server Side: ${ccc}, ${college}, ${major}`);
    const rawData = await fs.readFile(
      `json_data/schedules/ideal-schedule-format.json`,
      "utf8"
    );
    const data = JSON.parse(rawData);
    result["schedule"] = data;
    result["classes"] = organizeClasses(data);
    console.log("SERVER DATA: ", data);
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
