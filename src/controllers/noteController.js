const Note = require('../models/Note');
const jwt = require('jsonwebtoken');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const getAllNotes = async (req, res) => {
    try {
        const results = await Note.find().exec();
        res.json({ success: true, message: 'success retrieving all datas', data: results });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'server error' });
    }
}

const addNote = async (req, res) => {
    const { notes } = req.body;
    if (!notes) return res.status(400).json({ success: false, message: 'input field cannot empty' });

    try {
        const date = format(new Date(), 'yyyy-MM-dd | HH:mm:ss');
        const data = {
            date,
            orderInfo: notes
        }

        const shift_key = Math.floor(Math.random()*10000);
        const viginere_key = uuid();
        const des_key = uuid();

        console.log(shift_key);

        const shift_text = jwt.sign(data, shift_key.toString());
        const viginere_text = jwt.sign(data, viginere_key);
        const des_text = jwt.sign(data, des_key);

        const result = await Note.create({
            shift_text,
            viginere_text,
            des_text,
            data
        });

        res.status(201).json({ success: true, message: 'note successfuly added', result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'server error' });
    }
}

const deleteNoteById = async (req, res) => {
    const id = req.params.id;

    if (!id) return res.status(400).json({ success: false, message: 'id required' });

    try {
        const foundNote = await Note.find({ _id: id }).exec();

        if (!foundNote) return res.status(404).json({ success: false, message: `note with id ${id} not found` });

        const result = await Note.deleteOne({ _id: id }).exec();
        res.json({ success: true, message: `note with id ${id} deleted successfuly`, data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'server error' });
    }
}

module.exports = { getAllNotes, addNote, deleteNoteById };