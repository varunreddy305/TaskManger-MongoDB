const mongodb = require('mongodb').MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'Task-manager';

mongodb.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
	if (error) {
		return console.log('Unable to connect to database');
	}
	const db = client.db(databaseName);
	db.collection('Family members')
		.insertMany([
			{
				name: 'Varun',
				age: 25
			},
			{
				name: 'Kirthi',
				age: 20
			},
			{
				name: 'Gopal',
				age: 55
			},
			{
				name: 'Vanaja',
				age: 48
			}
		])
		.then(res => {
			console.log(res);
		});
	// db.collection('Family members')
	// 	.deleteOne({
	// 		name: 'Varun'
	// 	})
	// 	.then(res => {
	// 		console.log('Rows affected',res.deletedCount);
	// 	});
});
