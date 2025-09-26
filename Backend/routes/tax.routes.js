const express = require("express");
const router = express.Router();
const { addTax, getTaxes, getTaxById, updateTax, deleteTax } = require("../controllers/tax.controllers");

// CRUD routes
router.post("/", addTax);
router.get("/", getTaxes);
router.get("/:id", getTaxById);
router.put("/:id", updateTax);
router.delete("/:id", deleteTax);

module.exports = router;
