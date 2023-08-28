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

module.exports = router;
