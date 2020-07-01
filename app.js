import express from 'express';
import mongoose from 'mongoose';

import { accountRoute } from './routes/accountRoute.js';
import { agencyRoute } from './routes/agencyRoute.js';

const app = express();

const mongoDBConnection = async () => {
  try {
    await mongoose.connect('MONGO_ATLAS_URL', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB connected');
  } catch (err) {
    console.log('DB not connected');
  }
};

mongoDBConnection();

app.use(express.json());

app.use('/account', accountRoute);
app.use('/agency', agencyRoute);

app.listen(3003, () => console.log('API started'));
