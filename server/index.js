/* eslint-disable import/extensions */
import cors from 'cors';
import express from 'express';

import db from './config/database.js';
import router from './routes/router.js';

const app = express();

try {
  db.authenticate();
  console.log('Database connected...');
} catch (error) {
  console.error('Connection error:', error);
}

app.use(cors());
app.use(express.json());
app.use('/', router);

app.listen(5000, () => console.log('Server running at port 5000'));
