const User = require('../models/User');
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) return res.status(400).json({ success: false, message: 'user or password cannot empty' });

    try {
        const foundUser = await User.findOne({ name }).exec();

        if (!foundUser) return res.status(404).json({ success: false, message: 'user not found' });

        const match = await bcrypt.compare(password, foundUser.password);

        if (!match) return res.status(403).json({ success: false, message: 'name or password invalid '});

        res.json({ success: true, message: `user ${name} logged in `, data: { name: foundUser.name, roles: foundUser.roles }});
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'server error' });
    }
}

module.exports = handleLogin;