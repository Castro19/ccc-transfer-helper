import express from "express";
import cors from "cors";
import agreements from "./routes/agreement.js";
import users from "./routes/user.js";
import schedules from "./routes/schedule.js";
const port = 8000;
const app = express();

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use("/agreements", agreements);
app.use("/users/", users);
app.use("/schedules/", schedules);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
