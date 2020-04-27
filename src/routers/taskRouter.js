const express = require('express');
const path = require('path');
const { Tasks, String2Boolean } = require('../models/mongoose');

const router = new express.Router();

router.get('/tasks', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/views/task.html'));
});

router.post('/postTask', async (req, res) => {
	const task = new Tasks({
		description: req.body.description,
		completed: String2Boolean(req.body.completed)
	});
	try {
		await task.save();
		res.send(task).status(201);
	} catch (e) {
		res.send(e.message).status(500);
	}
});

router.get('/tasks/:id', async (req, res) => {
	const _id = req.params.id;
	try {
		const task = await Tasks.findById(_id);
		if (!task) {
			return res.status(404).send('Not found');
		}
		res.send(task);
	} catch (e) {
		res.status(500).send(e);
	}
});

router.patch('/updateTasks/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdated = ['description', 'completed'];
	const isValidOperation = updates.every(update => allowedUpdated.includes(update));
	if (!isValidOperation) {
		return res.status(404).send({ error: 'Invalid updates!' });
	}
	try {
		const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
		if (!task) {
			return res.status(404).send('Not found');
		}
		res.send(task);
	} catch (e) {
		res.status(500).send('ghjghjg');
	}
});
router.delete('/deleteTask/:id', async (req, res) => {
	try {
		const task = await Tasks.findByIdAndDelete(req.params.id);
		if (!task) {
			return res.status(404).send('Not found');
		}
		res.send(task);
	} catch (e) {
		res.status(404).send(e);
	}
});

router.get('/listTasks', async (req, res) => {
	try {
		const tasks = await Tasks.find();
		res.send(tasks).status(201);
	} catch (e) {
		res.status(500).send(e);
	}
});

module.exports = router;
