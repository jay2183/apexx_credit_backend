const Bill = require("../models/bill");
const BillNum = require("../models/billNum");

exports.createBill = async (req, res) => {
    try {
      const { userId } = req.body;
      const newBill = new Bill(req.body);

      let billNumEntry = await BillNum.findOne({ userId });

      if (!billNumEntry) {
        // If no previous entry, create one with billNumber = 1
        billNumEntry = new BillNum({ userId, billNumber: 1 });
      } else {
        // Increment bill number
        billNumEntry.billNumber += 1;
      }
  
      // Save or update the bill number
      await billNumEntry.save();

    // Create new bill
   

   
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

  

exports.getBillNumber = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the latest bill for the user
    const lastBill = await BillNum.findOne({ userId }).sort({ billNumber: -1 }).limit(1);

    // Calculate the next bill number
    const nextBillNumber = lastBill ? lastBill.billNumber + 1 : 1;

    res.status(200).json({ success: true, billNumber: nextBillNumber });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
