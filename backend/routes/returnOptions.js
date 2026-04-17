import express from 'express';
import * as returnOptionDB from '../data/returnOptionDB.js'

const router = express.Router();

router.get("/", async (req, res) => {
  const returnOptions = await returnOptionDB.get_return_options();
  res.status(200).json(returnOptions);
})

export default router;