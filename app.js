import express from 'express';
import mongoose from 'mongoose';

import { accountRoute } from './routes/accountRoute.js';
import { agencyRoute } from './routes/agencyRoute.js';

const app = express();

const mongoDBConnection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USERDB}:${process.env.PWDDB}@cluster0-qasg0.mongodb.net/test?retryWrites=true&w=majority`,
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

app.listen(process.env.PORT || 3001, () => console.log('API started'));
