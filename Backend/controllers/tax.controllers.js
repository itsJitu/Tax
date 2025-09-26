const Tax = require("../models/tax.models");

// Add a new tax entry
const addTax = async (req, res) => {
  try {
    const {  gst, igst, cgst, sgst } = req.body;
    const newTax = new Tax({ gst, igst, cgst, sgst });
    await newTax.save();
    res.status(201).json(newTax);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all taxes
const getTaxes = async (req, res) => {
  try {
    const taxes = await Tax.find();
    res.status(200).json(taxes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get tax by ID
const getTaxById = async (req, res) => {
  try {
    const tax = await Tax.findById(req.params.id);
    if (!tax) return res.status(404).json({ message: "Tax not found" });
    res.status(200).json(tax);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update tax
const updateTax = async (req, res) => {
  try {
    const updatedTax = await Tax.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTax) return res.status(404).json({ message: "Tax not found" });
    res.status(200).json(updatedTax);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete tax
const deleteTax = async (req, res) => {
  try {
    const deletedTax = await Tax.findByIdAndDelete(req.params.id);
    if (!deletedTax) return res.status(404).json({ message: "Tax not found" });
    res.status(200).json({ message: "Tax deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addTax, getTaxes, getTaxById, updateTax, deleteTax };
