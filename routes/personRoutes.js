const express = require('express');
const Person = require('../models/person');
const router = express.Router();
const { jwtAuthMiddleware, generateToken } = require('../jwt.js');

router.post('/signup', async (req, res) => {
  try {
    const person = req.body;
    const newPerson = new Person(person);
    const savedPerson = await newPerson.save();
    console.log('Person saved successfully', savedPerson);

    const payload = {
      id: savedPerson.id,
      username: savedPerson.username,
    };
    console.log('Payload saved successfully', payload);
    const token = generateToken(payload);
    console.log('token is', token);
    res.status(200).json({ savedPerson: savedPerson, token: token });
  } catch (error) {
    console.log('Error saving Person', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Person.findOne({ username: username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    // generate tokens
    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = generateToken(payload);
    res.json({ user: user, token: token });
  } catch (error) {
    console.log('Error logging in', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    console.log('User data fetched', userData);
    const userId = userData.id;
    const user = await Person.findById(userId);
    res.status(200).json({ user });
  } catch (error) {
    console.log('Error logging in', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/', jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log('data fetched');
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:workType', async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
      const response = await Person.find({ work: workType });
      console.log('data fetched');
      res.status(200).json({ data: response });
    } else {
      return res.status(400).json({ error: 'Invalid work type' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;
    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!response) {
      return res.status(404).json({ error: 'Person not found' });
    }
    console.log('Data updated');
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findOneAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: 'Person not found' });
    }
    console.log('Person deleted');
    res.status(200).json({ message: 'Person deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
