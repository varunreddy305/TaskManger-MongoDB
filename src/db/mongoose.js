const mongoose = require('mongoose');

const connectionUrl = 'mongodb://127.0.0.1:27017/TaskManagerApp';

mongoose.connect(connectionUrl, { useNewUrlParser: true, useCreateIndex: true });

const tasks = [
	{
		description: 'Cook chicken',
		completed: true
	},
	{
		description: 'Learn Node.js',
		completed: false
	},
	{
		description: 'Go on a drive',
		completed: true
	},
	{
		description: 'Clean the house',
		completed: false
	}
];

const Tasks = mongoose.model('Task', {
	description: {
		type: String
	},
	completed: {
		type: Boolean
	}
});

tasks.forEach(task => {
	new Tasks(task)
		.save()
		.then(res => {
			console.log(res);
		})
		.catch(e => {
			console.log(e);
		});
});
