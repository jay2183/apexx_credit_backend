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
// exports.getCustomers = async (req, res) => {
//   try {
//     const customers = await Customer.find();
//     res.json(customers);
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };
exports.getCustomersByUserId = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you get `req.user._id` from authentication middleware
    const customers = await Customer.find({ userId });

    if (!customers.length) {
      return res.status(404).json({ success: false, message: "No customers found for this user." });
    }

    res.json(customers);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.deleteCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;

    const deletedCustomer = await Customer.findByIdAndDelete(customerId);

    if (!deletedCustomer) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }

    res.json({ success: true, message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


