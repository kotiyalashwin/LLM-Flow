import express from "express";
import { runWorkFlow } from "../services/runner";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    console.log(body);

    const response = await runWorkFlow(body);

    res.json(response);
  } catch (e) {
    // console.log(e);
    res.status(401).json({ message: "Error Occured" });
  }
});

export default router;
