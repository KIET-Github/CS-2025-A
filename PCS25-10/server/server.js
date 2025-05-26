// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const authRoutes = require("./routes/auth"); // Ensure this path is correct

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Routes
// app.use("/api", authRoutes); // ✅ This ensures /api/register is available

// const PORT = process.env.PORT || 5000;

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log("MongoDB connected");
//         app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//     })
//     .catch((err) => console.error("MongoDB connection error:", err));







const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();

// Middleware to set Permissions-Policy header to allow geolocation
app.use((req, res, next) => {
    res.setHeader('Permissions-Policy', 'geolocation=(self)'); // Allow geolocation in iframe
    next();
});

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error("MongoDB connection error:", err));
