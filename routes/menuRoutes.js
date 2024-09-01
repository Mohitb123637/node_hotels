const express = require('express');
const menuItem = require('../models/menu');
const router = express.Router();

router.post("/", async(req,res)=>{
    try {
      const item = req.body;
      const newItem = new MenuItem(item);
      const savedItem = await newItem.save();
      console.log("Menu item saved successfully", savedItem);
      res.status(200).json(savedItem);
    } catch (error) {
      console.log("Error saving Menu Item", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })

  router.get("/:tasteType", async (req, res) => {
    try {
        const tasteType = req.params.tasteType;
        if(tasteType === "sour" || tasteType === "sweet" || tasteType === "spicy"){
            const menuItems = await menuItem.find({taste: tasteType});
            console.log("Menu items fetched successfully", menuItems);
            res.status(200).json(menuItems);
        }else{
            res.status(400).json({ error: "Invalid taste type" });
        }

    } catch (error) {
        res.status(400).json({ error: error})
        console.log("Error fetching Menu Items", error);
    }
  })
  
  router.get("/", async(req,res)=>{
    try {
      const menuItems = await menuItem.find();
      console.log("Menu items fetched successfully", menuItems);
      res.status(200).json(menuItems);
    } catch (error) {
      
    }
  })

  router.put("/:id", async (req, res)=>{
    try {
        const MenuId = req.params.id;
        const updatedItem = req.body;
        const response = await menuItem.findByIdAndUpdate(MenuId, updatedItem, {
            new: true,
            runValidators: true
        })
        if(!response){
            return res.status(404).json({ error: "Menu Item not found" });
        }
        console.log("Menu updated")
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
  })

router.delete("/:id", async (req,res)=>{
    try {
        const menuId = req.params.id;
        const response = await menuItem.findByIdAndDelete(menuId);
        if(!response){
            return res.status(404).json({ error: "Menu Item not found" });
        }
        console.log("Menu deleted")
        res.status(200).json({message: "Menu deleted"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

  module.exports = router;