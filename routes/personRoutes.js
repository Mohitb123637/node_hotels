const express = require('express');
const Person = require('../models/person');
const router = express.Router();

router.post('/', async(req,res)=>{
    try {
     const person = req.body;
     const newPerson = new Person(person);
     const savedPerson = await newPerson.save();
     console.log("Person saved successfully", savedPerson);
     res.status(200).json(savedPerson);
    } catch (error) {
     console.log("Error saving Person", error);
     res.status(500).json({ error: "Internal Server Error" });
    }
   })

   router.get('/', async (req,res)=>{
    try {
      const data = await Person.find()
      console.log("data fetched")
      res.status(200).json(data);
    } catch (error) {
      
    }
  })
  

  router.get('/:workType', async (req, res) => {
    try {
     const workType = req.params.workType;;
     if(workType == "chef" || workType == "manager" || workType == "waiter"){
       const response = await Person.find({work: workType});
       console.log("data fetched")
       res.status(200).json({data: response})
     }else{
       return res.status(400).json({ error: "Invalid work type" });
     }
    } catch (error) {
     console.log(error);
     res.status(500).json({ error: "Internal Server Error" });
    }
   })

   router.put("/:id", async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidators: true,
        })

        if(!response){
            return res.status(404).json({ error: "Person not found" });
        }
        console.log("Data updated")
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
   })

   router.delete('/:id', async(req, res) =>{
    try {
        const personId = req.params.id;
        const response = await Person.findOneAndDelete(personId)
        if(!response){
            return res.status(404).json({ error: "Person not found" });
        }
        console.log("Person deleted");
        res.status(200).json({message: "Person deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });   
    }
   } )
   
   module.exports = router;