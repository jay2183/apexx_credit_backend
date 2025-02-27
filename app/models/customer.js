const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
});

module.exports = mongoose.model("Customer", customerSchema);
