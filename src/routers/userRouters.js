const { User } = require('../models/userMongoose');
const express = require('express');
const path = require('path');
const auth = require('../middleware/auth');
const multer = require('multer');

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

const upload = multer({
	dest: 'avatar/',
	limits: {
		fileSize: 6000000
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
			cb(new Error('Please upload a valid file'));
		}
		cb(undefined, true);
	}
});

router.get('/file', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/upload.html'));
});

router.post(
	'/upload',
	upload.single('avatar'),
	async (req, res) => {
		try {
			req.filename = req.file.originalname;
			console.log(req.file);
			res.send('Successfully uploaded');
		} catch (e) {
			res.send(e.message);
		}
	},
	(err, req, res, next) => {
		res.status(400).send(err.message);
	}
);

module.exports = router;
