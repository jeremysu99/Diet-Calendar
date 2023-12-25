const express = require('express');
const foodModel = require('../models/food');
const router = express.Router();

router.get('/:id', async (req, res) =>{
    try{
        const { id } = req.params;
        const foods = await foodModel.findById(id).exec();
        res.status(200).json({foods});
    }
    catch (error){
        console.log(error.message);
        res.status(500).send({ message: error.message});
    }
});

router.get('/', async (req, res) =>{
    try{
        const foods = await foodModel.find().exec();
        res.status(200).json({foods});
    }
    catch (error){
        console.log(error.message);
        res.status(500).send({ message: error.message});
    }
});

router.post('/', async (req, res) => {
    const { name, amount, calories} = req.body;

    if (!name || !calories) {
        res.status(400).json({ error: "Invalid Input" });
    } else {
        try {
            const newFood = await foodModel.create(req.body);

            res.status(200).json({ newFood });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
});


router.put('/:id', async (req, res) =>{
    try {
        const {name, amount, calories} = food;
        if (!name || !calories){
            res.status(400).json({error: "Invalid Input"});
        }
        else{
            const { id } = req.params;
            const result = await foodModel.findByIdAndUpdate(id, req.body);
            res.status(200).send({ message: "Updated successfully"});
        }
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
})

router.delete('/:id', async (req, res) =>{
    try{
        const { id } = req.params;

        const result = await foodModel.findByIdAndDelete(id);

        if (!result){
            res.status(404).json({ message: 'Food not found'});
        }
        res.status(200).send({ message: 'Deleted successfully'});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({ message: error.message});
    }
})
module.exports = router;