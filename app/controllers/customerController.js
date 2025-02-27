const Customer = require("../models/customer");

// Get current time
const getTimeNow = () => {
  return new Date().toLocaleTimeString();
};

// Add a new customer
exports.addCustomer = async (req, res) => {
  try {
    const { name, phone, date } = req.body;
    console.log("req body ",req.body);
    
    const dateTimeNow = new Date().toISOString().split("T")[0];

    const customer = new Customer({
      name,
      phone,
      time: getTimeNow(),
      date: date || dateTimeNow,
      userId:req.user._id
    });

    await customer.save();
    res.status(201).json({ success: true, customer });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Fetch all customers
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
