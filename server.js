const express = require('express');
const app = express();
const db = require('./db');
require("dotenv").config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const personRoutes = require("./routes/personRoutes.js");
const menuRoutes = require("./routes/menuRoutes.js");
const passport = require('./auth.js');

// Middleware for parsing JSON bodies
app.use(bodyParser.json());
// Custom middleware to log requests
const logRequest = (req, res, next) => {
  console.log(`${new Date().toLocaleString()} Request Made to: ${req.originalUrl}`);
  next();
};

// Log requests
app.use(logRequest);

// Initialize Passport.js
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', { session: false });


// Public route
app.get("/",(req, res) => {
  res.send("Welcome to hotel");
});

// Routes requiring authentication
app.use('/person', personRoutes);
app.use('/menu', localAuthMiddleware, menuRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});
