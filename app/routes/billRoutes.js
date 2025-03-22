const express  = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { createBill, editBill, deleteBill,getBillsByUser,getBillNum } = require("../controllers/billController");



router.post("/",authMiddleware, createBill);
router.put("/:id",authMiddleware, editBill);
router.delete("/:id",authMiddleware, deleteBill);
router.get("/:userId",authMiddleware, getBillsByUser);
router.get("/numer/:userId",authMiddleware, getBillNum);

module.exports = router;