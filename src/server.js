require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const connectDB = require('./config/dbConn.js');
const mongoose = require('mongoose');
const cors = require('cors');

connectDB();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send(`the port is ${PORT}`);
})

app.use('/register', require('./routes/register.js'));
app.use('/auth', require('./routes/auth.js'));
app.use('/food', require('./routes/food.js'));
app.use('/note', require('./routes/note.js'));

mongoose.connection.once('open', () => {
    console.log('db connected');
    console.log('endpoint for register /resgister');
    console.log('endpoint for auth /auth');
    console.log('endpoint for food /food');
    console.log('endpoint for note /note');

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})