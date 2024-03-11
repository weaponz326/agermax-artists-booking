const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const connectDB = require("./configs/db");
const passport = require("passport");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = ["http://localhost:3000", "https://app.agermax.com"];

// Enable CORS for all routes with dynamic origin check
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "yourSecretKey", // Use an environment variable or replace 'yourSecretKey'
    resave: false,
    saveUninitialized: true,
    cookie: { secure: !!(process.env.NODE_ENV === "production") },
  })
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session()); // Tells Passport to use express-session

// Importing Passport configuration
require("./configs/passport-configs");

// Body parsing middleware setup
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const artistRoutes = require("./routes/artistRoutes");
const organizerRoutes = require("./routes/eventOrganizerRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");

app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", artistRoutes);
app.use("/api", organizerRoutes);
app.use("/api", bookingRoutes);
app.use("/api", userRoutes);
app.use("/api", invoiceRoutes);
app.use("/api", paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
