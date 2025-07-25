import express from "express";
import { runWorkFlow } from "../services/runner";
import { connections } from "../index";

const router = express.Router();


router.post("/:conId", async (req, res) => {
  try {
    
    const body = req.body;
    const {conId} = req.params
    const ws = connections.get(conId)
    // console.log(connections)
    if(!ws){
      res.json({message : 'Ws not established'})
      return
    }

    const response = await runWorkFlow(body , ws );
    // console.log(response);
    res.json(response);
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: "Error Occured" });
  }
});

export default router;
