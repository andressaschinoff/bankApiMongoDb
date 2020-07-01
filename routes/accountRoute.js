import express from 'express';

import {
  balanceUpdate,
  balanceCheck,
  transferBetweenAccounts,
  deleteAccount,
} from '../controllers/accountController.js';

const app = express();

app.put('/deposit/:agency/:account', async (req, res) => {
  try {
    const balance = req.body.balance;
    const agency = req.params.agency;
    const account = req.params.account;
    const newBalance = await balanceUpdate(balance, agency, account);

    res.send(`${newBalance}`);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.put('/withdraw/:agency/:account', async (req, res) => {
  try {
    const balance = req.body.balance;
    const agency = req.params.agency;
    const account = req.params.account;
    const newBalance = await balanceUpdate(
      balance,
      agency,
      account,
      'withdraw'
    );

    res.send(`${newBalance}`);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/:agency/:account', async (req, res) => {
  try {
    const agency = req.params.agency;
    const account = req.params.account;
    const balance = await balanceCheck(agency, account);

    res.send(`${balance}`);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete('/:agency/:account', async (req, res) => {
  try {
    const agency = req.params.agency;
    const account = req.params.account;
    const accounts = await deleteAccount(agency, account);

    res.status(200).send(`${accounts}`);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.put('/transfer/:accountFrom/:accountTo/:value', async (req, res) => {
  try {
    const value = req.params.value;
    const agencyFrom = req.body.agencyFrom;
    const accountFrom = req.params.accountFrom;
    const agencyTo = req.body.agencyTo;
    const accountTo = req.params.accountTo;

    const newBalance = await transferBetweenAccounts(
      agencyFrom,
      accountFrom,
      agencyTo,
      accountTo,
      value
    );

    res.send(`${newBalance}`);
  } catch (err) {
    res.status(400).send(err);
  }
});

export { app as accountRoute };
