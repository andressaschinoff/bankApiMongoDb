import express from 'express';

import { moneyFormat } from '../helpers/numberFormat.js';
import {
  avaregeBalance,
  minBalance,
  maxBalance,
  vipClients,
} from '../controllers/agencyController.js';

const app = express();

app.get('/avarege/:agency', async (req, res) => {
  try {
    const agency = Number(req.params.agency);
    const avarege = await avaregeBalance(agency);
    const formatedAvarege = moneyFormat(avarege);

    res.send(`${formatedAvarege}`);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/min/:limit', async (req, res) => {
  try {
    const limit = Number(req.params.limit);
    const minimumBalance = await minBalance(limit);

    res.send(minimumBalance);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/max/:limit', async (req, res) => {
  try {
    const limit = Number(req.params.limit);
    const maximumBalance = await maxBalance(limit);
    console.log(maximumBalance);

    res.send(maximumBalance);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/vip', async (_req, res) => {
  try {
    const privateAgency = await vipClients();

    res.send(privateAgency);
  } catch (err) {
    res.status(400).send(err);
  }
});

export { app as agencyRoute };
