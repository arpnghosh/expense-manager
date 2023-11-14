import expressAsyncHandler from "express-async-handler";
import Transaction from "../models/transactionModel.js";
import User from "../models/userModel.js";

// GET ALL TRANSACTIONS
const getTransaction = expressAsyncHandler(async (req, res) => {
  const transactions = await Transaction.find({ user: req.user._id });
  res.status(200).json(transactions);
});

// GET TRANSACTIONS BY CATEGORY
const getTransactionCat = async (req, res) => {
  try {
    const { category } = req.params
    const transaction = await Transaction.find({ category })
    if (!transaction) {
      res.status(400).json({ message: "invalid category" })
    }
    res.status(200).json(transaction)
  } catch (error) {
    res.status(400).json({message: "internal server error"})

  }
}

// POST
const AvailableCategory = {
  "ElectricityBill": true,
  "Food": true,
  "Transportation": true,
  "HouseRent": true,
  "Insurance": true,
  "Entertainment": true,
  "Miscellaneous": true,
  "Healthcare": true,
  "Savings": true,
  "Internet": true
}

const postTransaction = expressAsyncHandler(async (req, res) => {
  const { category: TransactionCategory, amount } = req.body;

  if (!AvailableCategory[TransactionCategory]) {
    res.status(400).json({ message: "invalid transaction category" })
    return;
  }

  const transaction = await Transaction.create({
    category: TransactionCategory,
    amount,
    user: req.user._id,
  });
  res.status(200).json(transaction);
});

// update transaction
const putTransaction = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error({ message: "no user" });
  }

  const existingTransaction = await Transaction.findById(req.params.id);

  if (!existingTransaction) {
    res.status(400);
    throw new Error({ message: "no user" });
  }
  if (existingTransaction.user.toString() != user.id) {
    res.status(400);
    throw new Error({ message: "user not authorized" });
  }

  const updatedTransaction = await Transaction.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedTransaction);
});

export { getTransaction, getTransactionCat, postTransaction, putTransaction };
