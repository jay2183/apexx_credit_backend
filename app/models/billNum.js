const mongoose = require("mongoose");

const billNumSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        unique: true, // Ensures each user has only one BillNum entry
      },
      billNumber: {
        type: Number,
        required: true,
        default: 1, // Start from 1
      },
})

module.exports = mongoose.model('BillNum', billNumSchema);