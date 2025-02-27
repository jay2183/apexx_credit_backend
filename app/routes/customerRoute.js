const express = require("express");
const { addCustomer, getCustomers } = require("../controllers/customerController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/customers", authMiddleware, addCustomer);
router.get("/customers",authMiddleware, getCustomers);

module.exports = router;
