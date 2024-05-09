import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './src/configs/db.mjs';
import routes from './src/routes/index.mjs';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);


app.get('/api', async(req, res) => {
  res.status(200).send('Welcome to the ChatApplication');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
  console.log(`Listening on ${PORT}`)
 });