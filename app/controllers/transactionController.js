const Transaction = require("../models/transaction");

// Create a new transaction
const createTransaction = async (req, res) => {
  try {
    const { customerId, amountGiven, amountReceived, date, description } = req.body;

    if (!customerId || !date || !description) {
      return res.status(400).json({ message: "Customer ID, date, and description are required." });
    }

    if ((amountGiven && amountReceived) || (!amountGiven && !amountReceived)) {
      return res.status(400).json({ message: "Provide only one of amountGiven or amountReceived." });
    }

    // Find all past transactions for the given customer
    const transactions = await Transaction.find({ customerId });

    // Calculate total given and received amounts
    const totalAmountGiven = transactions.reduce((sum, txn) => sum + txn.amountGiven, 0);
    const totalAmountReceived = transactions.reduce((sum, txn) => sum + txn.amountReceived, 0);

    // Set amountGiven to 0 if amountReceived is provided, and vice versa
    const newAmountGiven = amountGiven || 0;
    const newAmountReceived = amountReceived || 0;

    // Calculate new totals after adding the current transaction
    const updatedTotalGiven = totalAmountGiven + newAmountGiven;
    const updatedTotalReceived = totalAmountReceived + newAmountReceived;

    // Calculate the balance (amountReceived - amountGiven)
    const calculatedAmount = updatedTotalReceived - updatedTotalGiven;

    // Create new transaction entry
    const newTransaction = new Transaction({
      customerId,
      amountGiven: newAmountGiven,
      amountReceived: newAmountReceived,
      calculatedAmount,
      date,
      description,
    });

    await newTransaction.save();

    res.status(201).json({ 
      message: "Transaction created successfully", 
      transaction: newTransaction 
    });
  } catch (error) {
    res.status(500).json({ message: "Database error", error: error.message });
  }
};


const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params; // Get transaction ID from URL params

    // Check if the transaction exists
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Delete the transaction
    await Transaction.findByIdAndDelete(id);
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Database error", error: error.message });
  }
};

// Get transactions by customer ID
const getTransactionsByCustomerId = async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const transactions = await Transaction.find({ customerId });

    // if (!transactions.length) {
    //   return res.status(404).json([]);
    // }

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Database error", error: error.message });
  }
};

module.exports = { createTransaction, getTransactionsByCustomerId,deleteTransaction };
