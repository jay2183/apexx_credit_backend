const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  customerId: { type: String, required:true },
  amountGiven: { type: Number, required: true },
  amountRemaining: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Transaction", transactionSchema);
