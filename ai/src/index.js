import express from 'express';
import * as dotenv from 'dotenv';
import geminiRoutes from './routes/gemini.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/gemini', geminiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});