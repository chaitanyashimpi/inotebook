const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();

const Notes = require('../models/Notes');

const { body, validationResult } = require('express-validator');

// Route 1: Get all the notes: GET "/api/notes/fetchallnotes"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
	try {
		const notes = await Notes.find({ user: req.user.id });

		res.json(notes);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});

// Route 2: Add a new note: POST "/api/notes/addNote" Login Required

router.post(
	'/addNote',
	fetchuser,
	[
		body('title', 'Enter a valid title').isLength({ min: 3 }),
		body('description', 'Description must be atleast 5 characters').isLength({
			min: 5,
		}),
	],
	async (req, res) => {
		const { title, description, tag } = req.body;

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const notes = new Notes({
				title,
				description,
				tag,
				user: req.user.id,
			});
			const savedNote = await notes.save();

			res.json(notes);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Internal Server Error');
		}
	}
);

// Route 3: Update existing note: PUT "/api/notes/updateNote" Login Required

router.put('/updateNote/:id', fetchuser, async (req, res) => {
	try {
		const { title, description, tag } = req.body;

		//Create a new note object

		const newNote = {};
		if (title) newNote.title = title;
		if (description) newNote.description = description;
		if (tag) newNote.tag = tag;

		// Find the note to be updated

		let note = await Notes.findById(req.params.id);

		if (!note) return res.status(404).send({ error: 'Not Found' });

		if (note.user.toString() !== req.user.id)
			return res.status(401).send({ error: 'Not Allowed' });

		note = await Notes.findByIdAndUpdate(
			req.params.id,
			{ $set: newNote },
			{ new: true }
		);
		res.send({ note });
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});

// Route 4: Delete existing note: delete "/api/notes/deleteNote" Login Required

router.delete('/deleteNote/:id', fetchuser, async (req, res) => {
	try {
		let note = await Notes.findById(req.params.id);

		if (!note) return res.status(404).send({ error: 'Note not Found' });

		if (note.user.toString() !== req.user.id)
			return res.status(401).send({ error: 'Not Allowed' });

		note = await Notes.findByIdAndDelete(req.params.id);

		res.send({ Success: 'Not Deleted' });
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});

module.exports = router;
