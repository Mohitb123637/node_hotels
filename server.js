const express = require('express');
const app = express();
const db = require('./db');
require("dotenv").config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const personRoutes = require("./routes/personRoutes.js");
const menuRoutes = require("./routes/menuRoutes.js");

app.use('/person', personRoutes);
app.use('/menu', menuRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});
