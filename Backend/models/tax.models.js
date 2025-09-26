const mongoose = require("mongoose");

const taxSchema = new mongoose.Schema({
    // product: { type: String, required: true },
    // hsn: { type: Number, required: true },
    gst: { type: Number, required: true },
    igst: { type: Number, required: true },
    cgst: { type: Number, required: true },
    sgst: { type: Number, required: true },
}, { timestamps: true });

// Export the model
const Tax = mongoose.model("Tax", taxSchema);
module.exports = Tax;
