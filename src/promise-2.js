const { Tasks } = require('./models/mongoose');
const { User } = require('./models/userMongoose');

// Tasks.findByIdAndUpdate('5e9f1e5bd7a157f1aba4e848', { completed: true })
// 	.then(async task => {
// 		await console.log(task);
// 		return Tasks.countDocuments({ completed: false });
// 	})
// 	.then(res => {
// 		console.log(res);
// 	})
// 	.catch(e => {
// 		console.log(e);
// 	});

// const updateAgeAndCount = async (id, age) => {
// 	const user = await User.findByIdAndUpdate(id, { age });
// 	const count = await User.countDocuments({ age });
// 	return {
// 		user,
// 		count
// 	};
// };

// updateAgeAndCount('5ea06187f9b4170b07dee214',3)
// 	.then(res => {
// 		console.log(res);
// 	})
// 	.catch(e => {
// 		console.log(e);
// 	});

async function deleteTaskAndCount(id, completed) {
	const task = await Tasks.findByIdAndDelete(id);
	const count = await Tasks.countDocuments({ completed });
	return {
		task,
		count
	};
}

deleteTaskAndCount('5e9f1e5bd7a157f1aba4e846', false)
	.then(res => {
		console.log(res);
	})
	.catch(e => {
		console.log(e);
	});
