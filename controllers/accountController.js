import { accountModel } from '../models/accounts.js';

const balanceUpdate = async (
  value,
  agency,
  account,
  transaction = 'deposit'
) => {
  let newBalance = value;
  const findedAccount = await accountModel.findOne({
    agencia: agency,
    conta: account,
  });

  if (!findedAccount) {
    return 'Conta não encontrada!';
  }

  if (transaction === 'withdraw') {
    newBalance = -newBalance - 1;
    if (findedAccount.balance + newBalance < 0) {
      return 'Conta sem saldo suficiente';
    }
  }
  const updatedAccount = await accountModel.findOneAndUpdate(
    { agencia: agency, conta: account },
    { $inc: { balance: newBalance } },
    { new: true }
  );

  return updatedAccount.balance;
};

const balanceCheck = async (agency, account) => {
  const findedAccount = await accountModel.findOne({
    agencia: agency,
    conta: account,
  });

  if (!findedAccount) {
    return 'Conta não encontrada!';
  }

  const balance = findedAccount.balance;

  return balance;
};

const deleteAccount = async (agency, account) => {
  const findedAccount = await accountModel.findOneAndDelete({
    agencia: agency,
    conta: account,
  });

  if (!findedAccount) {
    return 'Conta não encontrada!';
  }

  const agencyAccounts = await accountModel.count({ agencia: agency });

  return agencyAccounts;
};

const transferBetweenAccounts = async (
  agencyFrom,
  accountFrom,
  agencyTo,
  accountTo,
  value
) => {
  let rate = 0;
  if (agencyFrom !== agencyTo) {
    rate = 8;
  }
  const findedAccountFrom = await accountModel.findOneAndUpdate(
    { agencia: agencyFrom, conta: accountFrom },
    { $inc: { balance: -value - rate } },
    { new: true }
  );

  const findedAccountTo = await accountModel.findOneAndUpdate(
    { agencia: agencyTo, conta: accountTo },
    { $inc: { balance: value } },
    { new: true }
  );

  if (!findedAccountFrom && !findedAccountTo) {
    return 'Conta não encontrada!';
  }

  return findedAccountFrom.balance;
};

export { balanceUpdate, balanceCheck, deleteAccount, transferBetweenAccounts };
