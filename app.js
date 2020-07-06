import express from 'express';
import mongoose from 'mongoose';

import { accountRoute } from './routes/accountRoute.js';
import { agencyRoute } from './routes/agencyRoute.js';

const app = express();

const host = process.env.DB_HOST;
const username = process.env.DB_USER;
const password = process.env.DB_PASS;

const mongoDBConnection = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://' +
        username +
        ':' +
        password +
        '@mongodb2020.qasg0.gcp.mongodb.net/bankIGTI?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log('DB connected');
  } catch (err) {
    console.log('DB not connected');
  }
};

mongoDBConnection();

app.use(express.json());

app.use('/account', accountRoute);
app.use('/agency', agencyRoute);

app.listen(host || 3001, () => console.log('API started'));
