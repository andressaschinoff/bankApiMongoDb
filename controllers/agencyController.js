import { accountModel } from '../models/accounts.js';

const avaregeBalance = async (agency) => {
  const agencyAccounts = await accountModel.aggregate([
    { $match: { agencia: agency } },
    {
      $group: {
        _id: null,
        avarege: { $avg: '$balance' },
      },
    },
  ]);

  return agencyAccounts[0].avarege;
};

const minBalance = async (limit) => {
  const orderedToBalance = await accountModel
    .find({}, { _id: 0, agencia: 1, conta: 1, balance: 1 })
    .sort({ balance: 1, name: 1 })
    .limit(limit);

  return orderedToBalance;
};

const maxBalance = async (limit) => {
  const orderedToBalance = await accountModel
    .find({}, { _id: 0, agencia: 1, conta: 1, name: 1, balance: 1 })
    .sort({ balance: -1, name: 1 })
    .limit(limit);

  return orderedToBalance;
};

const vipClients = async () => {
  const privateAgency = await accountModel
    .find(
      { agencia: 99 },
      { _id: 0, agencia: 1, conta: 1, name: 1, balance: 1 }
    )
    .sort({ balance: -1, name: 1 });

  if (privateAgency.length <= 0) {
    const vip = await accountModel.aggregate([
      {
        $group: {
          _id: { agencia: '$agencia' },
          balance: { $max: '$balance' },
        },
      },
      { $sort: { balance: -1 } },
      { $addFields: { privateAgency: 99 } },
    ]);

    for (let i = 0; i < vip.length; i++) {
      await accountModel.findOneAndUpdate(
        {
          agencia: vip[i]._id.agencia,
          balance: vip[i].balance,
        },
        { agencia: 99 },
        { new: true }
      );
    }
  }

  return privateAgency;
};

export { avaregeBalance, minBalance, maxBalance, vipClients };
