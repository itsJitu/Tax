const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

// Middleware
const app = express();
app.use(express.json());

const corsOption = {
    origin: process.env.FROENTEND_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
}
app.use(cors(corsOption));

// Connect to MongoDB   
mongoose.connect(process.env.MONGOOSE_URL)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log(err));

// Routes
const taxRoutes = require("./routes/tax.routes");
app.use("/api/tax", taxRoutes);


const PORT  = process.env.PORT_NO || 8080;
app.listen(PORT, () => console.log(`Server is up and running on http://localhost:${PORT}`));