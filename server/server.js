import express from "express";
import cors from "cors";
import agreements from "./routes/agreement.js";

const port = 8000;
const app = express();

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use("/agreements", agreements);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
