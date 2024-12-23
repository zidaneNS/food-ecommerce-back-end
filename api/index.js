require('dotenv').config();

const express = require('express');
const app = express();
const PORT = 3000;
const connectDB = require('../src/config/dbConn.js');
const mongoose = require('mongoose');
const cors = require('cors');

connectDB();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send(`the port is ${PORT}`);
})

app.use('/register', require('../src/routes/register.js'));
app.use('/auth', require('../src/routes/auth.js'));
app.use('/food', require('../src/routes/food.js'));
app.use('/note', require('../src/routes/note.js'));

mongoose.connection.once('open', () => {
    console.log('db connected');
    console.log('endpoint for register /resgister');
    console.log('endpoint for auth /auth');
    console.log('endpoint for food /food');
    console.log('endpoint for note /note');

    app.listen(PORT, (err) => {
        if (err) {
            console.error(`Failed to start server on port ${PORT}:`, err);
        } else {
            console.log(`Server running on port ${PORT}`);
        }
    });    
})

module.exports = app;