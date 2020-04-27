const { User } = require('../models/userMongoose');
const express = require('express');
const path = require('path');
const auth = require('../middleware/auth');

const router = new express.Router();

router.get('/users', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/views/index.html'));
});

router.post('/postUser', async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();
		const token = await user.generateAuthToken();
		res.send({ user, token });
	} catch (e) {
		res.send(e.message).status(500);
	}
});

router.get('/user/login', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/userlogin.html'));
});

router.post('/validateUser', async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password);
		const token = await user.generateAuthToken();
		res.send({ user, token });
	} catch (e) {
		res.status(404).send(e);
	}
});

router.get('/listUsers', auth, async (req, res) => {
	res.send(req.user);
});

router.get('/users/me', auth, async (req, res) => {
	try {
		res.send(req.user);
	} catch (e) {
		res.status(500).send();
	}
});

module.exports = router;
