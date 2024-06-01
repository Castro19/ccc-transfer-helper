import express from "express";
import { promises as fs } from "fs";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const rawData = await fs.readFile(
      "json_data/community_colleges_formatted.json",
      "utf8"
    );
    const data = JSON.parse(rawData);
    res.send(data);
  } catch (error) {
    res.status(500).send("An error occurred while reading the data.");
    console.error("Failed to read file:", error);
  }
});

router.get("/:codeId/", async (req, res) => {
  try {
    const { codeId } = req.params;
    const [code, id] = codeId.split("_");

    const rawData = await fs.readFile(
      `json_data/ccc_info/${code}_${id}/univs.json`,
      "utf8"
    );
    const data = JSON.parse(rawData);
    res.send(data);
  } catch (error) {
    console.error("Error fetching university data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:codeId/:univCodeId/", async (req, res) => {
  try {
    const { codeId } = req.params;
    const [code, id] = codeId.split("_");
    // const [univCode, univId] = univCodeId.split("_");

    // Eventually use the univ code and univ id when we have more universities
    const rawData = await fs.readFile(
      `json_data/ccc_info/${code}_${id}/CPSLO_11.json`,
      "utf8"
    );
    const data = JSON.parse(rawData);
    res.send(data);
  } catch (error) {
    console.error("Error fetching university data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// router.
export default router;
