const mongoose = require('mongoose');
const validator = require('validator');

const connectionUrl = 'mongodb://127.0.0.1:27017/TaskManagerApp';

mongoose.connect(connectionUrl, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }).catch(e => {
	console.log(e.message);
});

const User = mongoose.model('User', {
	username: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Please provide valid email');
			}
		}
	},
	age: {
		type: Number,
		default: 0,
		validate(value) {
			if (value < 0) {
				throw new Error('Age cannot be negative');
			}
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 7,
		trim: true,
		validate(value) {
			if (value.toLowerCase().includes('password')) {
				throw new Error('Please provide a valid password');
			}
		}
	}
});
module.exports = { User };
