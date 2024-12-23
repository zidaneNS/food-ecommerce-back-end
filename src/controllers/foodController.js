const Food = require('../models/Food');

const getAllFoods = async (req, res) => {
    try {
        const results = await Food.find().exec();
        console.log('ini berhasil');
         res.json({ success: true, message: 'success retrieving all datas', data: results });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'server error' });
    }
}

const addFood = async (req, res) => {
    const { name, price, description, stock } = req.body;

    if (!name || !price || !description || !stock) return res.status(400).json({ success: false, message: 'input field cannot empty' });

    try {
        const duplicate = await Food.findOne({ name }).exec();

        if (duplicate) return res.status(409).json({ success: false, message: `food with name ${name} already exist` });

        const result = await Food.create({
            name,
            price,
            description,
            stock
        });

        res.status(201).json({ success: true, message: `food ${name} successfuly created`, data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'server error '});
    }
}

const deleteFoodById = async (req, res) => {
    const id = req.params.id;
    try {
        const foundFood = await Food.findOne({ _id: id }).exec();

        if(!foundFood) return res.status(404).json({ success: false, message: `food with id ${id} not found` });

        const result = await Food.deleteOne({ _id: id });
        res.json({ success: true, message: `food with id ${id} successfuly deleted`, data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'server error' });
    }
}

const updateFoodById = async (req, res) => {
    const id = req.params.id;
    const { name, price, description, stock } = req.body;

    if (!name || !price || !description || !stock) return res.status(400).json({ success: false, message: 'input field cannot empty' });

    try {
        const foundFood = await Food.findOne({ _id: id }).exec();

        if (!foundFood) return res.status(404).json({ success: false,  message: `food with id ${id}  not found` });

        foundFood.name = name;
        foundFood.price = price;
        foundFood.description = description;
        foundFood.stock = stock;

        const result = await foundFood.save();
        res.json({ success: true, message: `food with id ${id} successfuly updated`, data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'server error' });
    }
}

const orderedFoods = async (req, res) => {
    const { foods } = req.body;

    if (!Array.isArray(foods) || foods.length === 0) {
        return res.status(400).json({ success: false, message: 'Invalid or empty foods array' });
    }

    try {
        const allFoods = await Food.find().exec();
        const foodIds = allFoods.map(food => food._id.toString());

        for (const food of foods) {
            if (!foodIds.includes(food.id)) {
                return res.status(404).json({ success: false, message: `Food with id ${food.id} not found` });
            }

            const foundFood = await Food.findOne({ _id: food.id }).exec();

            if (!foundFood) {
                return res.status(404).json({ success: false, message: `Food with id ${food.id} not found` });
            }

            if (foundFood.stock < food.stock) {
                return res.status(400).json({ success: false, message: `Insufficient stock for food ${foundFood.name}` });
            }

            // Update stock
            foundFood.stock -= food.stock;
            await foundFood.save();
        }

        res.json({ success: true, message: 'Successfully updated stock for ordered foods' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


module.exports = { getAllFoods, addFood, deleteFoodById, updateFoodById, orderedFoods };