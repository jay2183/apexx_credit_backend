const mongoose = require("mongoose");

const billNumSchema = new mongoose.Schema({
    type: Number,
    required: true,
    default: 1,
})

module.exports = mongoose.model('BillNum', billNumSchema);