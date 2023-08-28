const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const fetchuser = require('../middleware/fetchuser')

let jwt = require('jsonwebtoken');

const JWT_SECRET = 'ChaitanyaToken';

// Route 1 :  Create user using: POST "/api/auth/createuser". Doesn't require authentication

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
				user: {
					id: user.id,
				},
			};

			const authToken = jwt.sign(data, JWT_SECRET);

			res.json({ authToken });
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Some error occurred');
		}
	}
);

// Route 2:  Authenticate a user using: POST "/api/auth/login". No login required

router.post(
	'/login',
	[
		body('email', 'Enter valid email').trim().isEmail(),
		body('password', "Password cann't be blank").exists(),
	],
	async (req, res) => {
		const errors = validationResult(res);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (!user) {
				return res
					.status(404)
					.json({ errors: 'Please try to login with correct credentials' });
			}

			const passwordCompare = await bcrypt.compare(password, user.password);

			if (!passwordCompare) {
				return res
					.status(404)
					.json({ errors: 'Please try to login with correct credentials' });
			}

			const data = {
				user: {
					id: user.id,
				},
			};

			const authToken = jwt.sign(data, JWT_SECRET);
			res.send({ authToken });
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Internal Server Error');
		}
	}
);

// Route 3: Get logged in user details using : POST "api/auth/getuser". Login Required

router.post('/getuser',fetchuser, async (req, res) => {
	try {
		let userId = req.user.id;
		const user = await User.findById(userId).select('-password');

		res.send(user)
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Internal Server Error');
	}
});

module.exports = router;
