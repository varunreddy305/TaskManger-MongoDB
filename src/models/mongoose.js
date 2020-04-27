const mongoose = require('mongoose');

const connectionUrl = 'mongodb://127.0.0.1:27017/TaskManagerApp';

mongoose.connect(connectionUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
});

const taskSchema = mongoose.Schema({
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

taskSchema.pre('save', async function (next) {
	console.log(this);
	next();
});

const Tasks = mongoose.model('Task', taskSchema);
const String2Boolean = value => {
	return value && value.toLowerCase() === 'true';
};

module.exports = { Tasks, String2Boolean };
