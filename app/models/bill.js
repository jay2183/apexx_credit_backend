
const mongoose = require("mongoose");
const billSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    billNumber: String,
    billDate: Date,
    items: [
      {
        itemName: String,
        quantity: Number,
        unit: String,
        rate: Number,
        gst: String,
        cess: Number,
        hsnCode: String,
        subTotal: String
      },
    ],
    notes: String,
    total: String
  });

  module.exports = mongoose.model("Bill", billSchema);