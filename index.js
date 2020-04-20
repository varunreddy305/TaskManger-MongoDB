const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'Task-manager';
// const id = new ObjectID();
// console.log(id.getTimestamp());
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

MongoClient.connect(connectionURL, { useUnifiedTopology: true })
	.then(client => {
		const db = client.db(databaseName);
		db.collection('Tasks')
			.insertMany(tasks)
			.then(res => {
				console.log(res.insertedCount);
			})
			.catch(err => {
				console.log(err);
			});
	})
	.catch(err => {
		console.log('Unable to connect to database', err);
	});
