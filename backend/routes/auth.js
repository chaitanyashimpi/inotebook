const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

let jwt = require('jsonwebtoken');

const JWT_SECRET = 'ChaitanyaToken'

// Create user using: POST "/api/auth/createuser". Doesn't require authentication

router.post(
	'/createuser',
	[
		body('email', 'Enter a valid email').trim().isEmail(),
		body('password', 'Enter a valid password (min 5 chracters)').isLength({
			min: 5,
		}),
		body('name', 'Enter a valid name').isLength({ min: 3 }),
	],
	async (req, res) => {
		// If there are errors return bad request and the errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		// Check whether the user with this email exist already
		try {
			let user = await User.findOne({ email: req.body.email });

			if (user) {
				return res
					.status(400)
					.json({ error: 'Sorry user with this email already exists' });
			}
			// Create a new user
			const salt = await bcrypt.genSalt(10);
			const secPass = await bcrypt.hash(req.body.password, salt);

			user = await User.create({
				name: req.body.name,
				password: secPass,
				email: req.body.email,
			});

			const data = {
				user:{
					id: user.id,
				}
			}
			
			const authToken = jwt.sign(data, JWT_SECRET)
			
			
			res.json({authToken});
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Some error occurred');
		}
	}
);

module.exports = router;
