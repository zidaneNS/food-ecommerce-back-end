const Note = require('../models/Note');
const jwt = require('jsonwebtoken');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const { Enkripsi_shift_chipher, Deskripsi_shift_chipher, generateShiftKey } = require('./shift_chipher')
const { Enkripsi_vigenere, generateVigenereKey, Deskripsi_vigenere } = require('./vigenere')
const { Enkripsi_des, generateDesKey, Deskripsi_des } = require('./des')

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

        const dataInput = JSON.stringify(data);
        console.log('data input',dataInput);

        const shift_key = generateShiftKey();
        const viginere_key = generateVigenereKey();
        const des_key = uuid(); // kalo udah ada fungsinya baris ini dikomen aja
        // const des_key = generateDesKey(); //ini diuncomment kalo udah jadi  algoritmanya

        console.log(shift_key);

        const shift_text = Enkripsi_shift_chipher(dataInput, shift_key);
        const viginere_text = Enkripsi_vigenere(dataInput, viginere_key);
        const des_text = jwt.sign(data, des_key); //ini komen aja kalo udah selesai
        // const des_text = Enkripsi_des(dataInput, des_key);

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