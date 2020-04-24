const mongoose = require('mongoose');

const connectionUrl = 'mongodb://127.0.0.1:27017/TaskManagerApp';

mongoose.connect(connectionUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
});

const Tasks = mongoose.model('Task', {
	description: {
		type: String,
		trim: true,
		required: true
	},
	completed: {
		type: Boolean,
		default: false
	}
});

const String2Boolean = value => {
	return value && value.toLowerCase() === 'true' ? true : false;
};

module.exports = { Tasks, String2Boolean };
