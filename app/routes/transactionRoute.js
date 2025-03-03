const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { createTransaction, getTransactionsByCustomerId,deleteTransaction } = require("../controllers/transactionController");

const router = express.Router();

// Route to create a transaction
router.post("/",authMiddleware, createTransaction);
router.delete("/:id",authMiddleware, deleteTransaction);

// Route to get transactions by customer ID
router.get("/:customerId",authMiddleware, getTransactionsByCustomerId);

module.exports = router;
