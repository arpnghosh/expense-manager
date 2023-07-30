import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  category: {
    type: String,
    enum: ['savings', 'expenses', 'investment'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
