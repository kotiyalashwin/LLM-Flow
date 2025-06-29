import express from "express";
import runRouter from "./routes/run";
import "dotenv/config";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Runner is Up");
});

app.use("/run", runRouter);

app.listen(8080, () => {
  console.log("Workflow Runner is up at http://localhost:8080");
});
