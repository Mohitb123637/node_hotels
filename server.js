const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const MenuItem = require('./models/menu.js');




app.get("/menu/person", async(req,res)=>{
  try {
    const menuItems = await MenuItem.find();
    console.log("Menu items fetched successfully", menuItems);
    res.status(200).json(menuItems);
  } catch (error) {
    
  }
})


const personRoutes = require("./routes/personRoutes.js");
const menuRoutes = require("./routes/menuRoutes.js");
app.use('/person', personRoutes);
app.use('/menu', menuRoutes);



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
