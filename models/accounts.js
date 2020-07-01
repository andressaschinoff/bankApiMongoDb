import mongoose from 'mongoose';

const accountSchema = mongoose.Schema({
  agencia: { type: Number, required: true },
  conta: { type: Number, required: true },
  name: { type: String, required: true },
  balance: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0) throw new Error('Valor negativo para saldo nao permitido');
    },
  },
});

const accountModel = mongoose.model('account', accountSchema);

export { accountModel };
