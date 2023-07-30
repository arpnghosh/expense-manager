import expressAsyncHandler from "express-async-handler";
import Transaction from "../models/transactionModel.js";
import User from "../models/userModel.js";

// get transaction

const getTransaction = expressAsyncHandler(async (req, res) => {
  const transactions = await Transaction.find({ user: req.user._id });
  res.status(200).json(transactions);
});

// post transaction

const postTransaction = expressAsyncHandler(async (req, res) => {
  const { category, amount } = req.body;

  const transaction = await Transaction.create({
    category,
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

export { getTransaction, postTransaction, putTransaction };
