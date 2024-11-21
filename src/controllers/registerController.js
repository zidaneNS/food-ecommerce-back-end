const User = require('../models/User');
const bcrypt = require('bcrypt');

const handleRegister = async (req, res) => {
    const { name, roles, password } = req.body;
    
    if (!name || !password) return res.status(400).json({ success: false, message: 'user or password required' });

    try {
        const duplicate = await User.findOne({ name }).exec();

        if (duplicate) return res.status(409).json({ success: false, message: `user with name ${name} already exist` });

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = roles ? await User.create({
            name,
            roles,
            password: hashedPassword
        }) : await User.create({
            name,
            password: hashedPassword
        });

        res.status(201).json({ success: true, message: `user ${name} created`, data: result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'server error' });
    }
}

module.exports = handleRegister;