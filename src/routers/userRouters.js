const { User } = require('../models/userMongoose');
const express = require('express');
const path = require('path');

const router = new express.Router();

router.get('/users', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/views/index.html'));
});

router.post('/postUser', async (req, res) => {
	const user = new User(req.body);
	console.log(req.body);
	try {
		await user.save();
		res.send(user).status(201);
	} catch (e) {
		res.send(e.message).status(500);
	}
});

router.get('/listUsers', async (req, res) => {
	try {
		const users = await User.find({});
		res.send(users);
	} catch (e) {
		res.status(500).send();
	}
});

module.exports = router;
