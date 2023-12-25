const express = require('express');
const router = express.Router();
const dateModel = require('../models/date');

router.get('/', async (req, res) => {
    const { month, day, year } = req.query;
    try {
      const date = await dateModel.findOne({ month, day, year }).populate('foodItems');
      if (!date) {
        return res.status(404).json({ message: 'Date not found' });
      }
  
      res.status(200).json(date);
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  });

//Create new date
router.post('/:month/:day/:year', async (req, res) => {
    const { month, day, year } = req.params;
    const { name, amount, calories } = req.body;
    try {
      let existingDate = await dateModel.findOne({ month, day, year }).populate('foodItems');
  
      if (!existingDate) {
        existingDate = await dateModel.create({ month, day, year, foodItems: [] });
      }
  
      existingDate.foodItems.push({ name, amount, calories });
      
      const updatedDate = await existingDate.save();
  
      res.status(201).json(updatedDate);
    } catch (error) {
      console.error('Error adding food item: ', error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  });
  
  
router.delete('/:dateId/:foodItemId', async (req, res) => {
    const { dateId, foodItemId } = req.params;
    try {
      const date = await dateModel.findById(dateId);
  
      if (!date) {
        return res.status(404).json({ message: 'Date not found' });
      }
  
      // Find the index of the food item to remove
      const foodIndex = date.foodItems.findIndex((item) => item._id.toString() === foodItemId);
  
      if (foodIndex === -1) {
        return res.status(404).json({ message: 'Food item not found in the date' });
      }
  
      // Remove the food item from the array
      date.foodItems.splice(foodIndex, 1);
  
      // Save the updated date
      await date.save();
  
      res.status(200).json({ message: 'Food item removed successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  });
  
  module.exports = router;
