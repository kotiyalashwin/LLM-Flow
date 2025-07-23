import express from "express";
import runRouter from "./routes/run";
import "dotenv/config";
import cosrs from 'cors'
import { ratelimiter } from "./rate-limiter";

const app = express();
app.use(cosrs({origin : 
  'http://localhost:3000'
}))
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Runner is Up");
});

app.use("/run/:id", ratelimiter, runRouter);

app.listen(8080, () => {
  console.log("Workflow Runner is up at http://localhost:8080");
});
