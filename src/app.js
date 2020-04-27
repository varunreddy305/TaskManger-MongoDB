const express = require('express');
const path = require('path');
const { User } = require('./models/userMongoose');
const { Tasks, String2Boolean } = require('./models/mongoose');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './public/views')));
const port = process.env.PORT || 3000;

app.get('/users', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

app.post('/postUser', async (req, res) => {
	const user = new User(req.body);
	console.log(req.body);
	try {
		await user.save();
		res.send(user).status(201);
	} catch (e) {
		res.send(e.message).status(500);
	}
});

app.get('/listUsers', async (req, res) => {
	try {
		const users = await User.find({});
		res.send(users);
	} catch (e) {
		res.status(500).send();
	}
});

app.get('/tasks', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/views/task.html'));
});

app.post('/postTask', async (req, res) => {
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

app.get('/tasks/:id', async (req, res) => {
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

app.patch('/updateTasks/:id', async (req, res) => {
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
app.delete('/deleteTask/:id', async (req, res) => {
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

app.get('/listTasks', async (req, res) => {
	try {
		const tasks = await Tasks.find();
		res.send(tasks).status(201);
	} catch (e) {
		res.status(500).send(e);
	}
});

app.listen(port, () => console.log(`Listening at port${port}`));
