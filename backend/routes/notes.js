const express = require('express');
const Notes = require('../models/Notes');
const router = express.Router();

const { body, validationResult } = require('express-validator');

router.post('/', [body('title').isLength({ min: 5 })], (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	Notes.create({
		title: req.body.title,
		description: req.body.description,
		tags: req.body.tag,
		date: req.body.date,
	})
		.then((notes) => res.json(notes))
		.catch((err) => {
			res.json({ error: 'Please enter unique value for email' });
			console.error(err);
		});

	// console.log(req.body);
	// const notes = Notes(req.body);
	// notes.save();
	// res.send(req.body);
});

module.exports = router;
