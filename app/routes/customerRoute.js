const express = require("express");
const { addCustomer, getCustomersByUserId,deleteCustomer } = require("../controllers/customerController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/customers", authMiddleware, addCustomer);
// router.get("/customers",authMiddleware, getCustomers);
router.get("/customers", authMiddleware, getCustomersByUserId);
router.delete("/customers/:id", authMiddleware, deleteCustomer);


module.exports = router;
