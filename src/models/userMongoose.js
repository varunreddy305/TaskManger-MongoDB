const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const connectionUrl = 'mongodb://127.0.0.1:27017/TaskManagerApp';

mongoose.connect(connectionUrl, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }).catch(e => {
	console.log(e.message);
});

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
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
	},
	tokens: [
		{
			token: {
				type: String,
				required: true
			}
		}
	]
});

userSchema.methods.generateAuthToken = async function () {
	const token = jwt.sign({ _id: this.id }, 'thisissecret', { expiresIn: '1 day' });
	this.tokens = this.tokens.concat({ token });
	await this.save();
	return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });
	if (!user) {
		throw new Error('unable to login');
	}
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		throw new Error('Unable to login');
	}

	return user;
};

userSchema.pre('save', async function (next) {
	const user = this;
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

const User = mongoose.model('User', userSchema);
module.exports = { User };
