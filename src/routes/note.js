const express = require('express');
const router = express.Router();
const { getAllNotes, addNote, deleteNoteById } = require('../controllers/noteController');

router.route('/')
    .get(getAllNotes)
    .post(addNote);

router.route('/:id')
    .delete(deleteNoteById);

module.exports = router;