import express from 'express';
import * as dotenv from 'dotenv';
import { main } from '../controllers/gemini.controller.js';

dotenv.config();

const router = express.Router();

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Welcome to the Gemini API!' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await main(prompt);
    res.status(200).json({ content: aiResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;