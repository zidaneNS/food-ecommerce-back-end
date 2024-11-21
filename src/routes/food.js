const express = require('express');
const router = express.Router();
const { getAllFoods, addFood, deleteFoodById, updateFoodById, orderedFoods } = require('../controllers/foodController');

router.route('/')
    .get(getAllFoods)
    .post(addFood)
    .put(orderedFoods);

router.route('/:id')
    .delete(deleteFoodById)
    .put(updateFoodById);

module.exports = router;