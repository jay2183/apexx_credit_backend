const Transaction = require("../models/transaction");

// Create a new transaction
const createTransaction = async (req, res) => {
  try {
    const { customerId, amountGiven, amountRemaining, date, description } = req.body;

    if (!customerId || !amountGiven || !amountRemaining || !date || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newTransaction = new Transaction({
      customerId,
      amountGiven,
      amountRemaining,
      date,
      description,
    });

    await newTransaction.save();
    res.status(201).json({ message: "Transaction created successfully", transaction: newTransaction });
  } catch (error) {
    res.status(500).json({ message: "Database error", error: error.message });
  }
};

// Get transactions by customer ID
const getTransactionsByCustomerId = async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const transactions = await Transaction.find({ customerId });

    if (!transactions.length) {
      return res.status(404).json({ message: "No transactions found for this customer." });
    }

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Database error", error: error.message });
  }
};

module.exports = { createTransaction, getTransactionsByCustomerId };
