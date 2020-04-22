const express = require('express');
const path = require('path');
const { User } = require('./models/userMongoose');
const { Tasks, String2Boolean } = require('./models/mongoose');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public/views')));
const port = process.env.PORT || 3000;

app.get('/users', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

app.post('/postUser', (req, res) => {
	const user = new User(req.body);
	user
		.save()
		.then(response => {
			res.send(response).status(201);
		})
		.catch(e => {
			res.send(e.message).status(500);
		});
});

app.get('/listUsers', (req, res) => {
	User.find({})
		.then(response => {
			res.send(response).status(201);
		})
		.catch(e => {
			res.status(500).send();
		});
});

app.get('/tasks', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/views/task.html'));
});

app.post('/postTask', (req, res) => {
	const task = new Tasks({
		description: req.body.description,
		completed: String2Boolean(req.body.completed)
	});
	task
		.save()
		.then(response => {
			res.send(response).status(201);
		})
		.catch(e => {
			res.send(e.message).status(500);
		});
});
app.get('/listTasks', (req, res) => {
	Tasks.find({})
		.then(response => {
			res.send(response).status(201);
		})
		.catch(e => {
			res.status(500).send();
		});
});

app.listen(port, () => console.log(`Listening at port${port}`));
