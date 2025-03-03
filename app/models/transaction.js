const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  customerId: { type: String, required:true },
  amountGiven: { type: Number, required: true },
  amountReceived: { type: Number, required: true },
  calculatedAmount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String },
});

module.exports = mongoose.model("Transaction", transactionSchema);
