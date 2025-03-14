const Bill = require("../models/bill");

exports.createBill = async (req, res) => {
    try {
      const newBill = new Bill(req.body);
      await newBill.save();
      res.status(201).json({ success: true, data: newBill });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  // Edit Bill
  exports.editBill = async (req, res) => {
    try {
      const updatedBill = await Bill.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedBill) return res.status(404).json({ success: false, message: "Bill not found" });
      res.json({ success: true, data: updatedBill });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  // Delete Bill
  exports.deleteBill = async (req, res) => {
    try {
      const deletedBill = await Bill.findByIdAndDelete(req.params.id);
      if (!deletedBill) return res.status(404).json({ success: false, message: "Bill not found" });
      res.json({ success: true, message: "Bill deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  exports.getBillsByUser = async (req, res) => {
    try {
      const bills = await Bill.find({ userId: req.params.userId });
      res.json({ success: true, data: bills });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };