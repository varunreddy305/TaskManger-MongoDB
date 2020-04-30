const express = require('express');
const userRouter = require('./routers/userRouters');
const taskRouter = require('./routers/taskRouter');

const app = express();
// app.use((req, res, next) => {
// 	res.status(503).send('Site is currently');
// });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
const port = process.env.PORT;

app.listen(port, () => console.log(`Listening at port${port}`));

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const myFunction = async () => {
	const password = '123456789';
	const hashedPassword = await bcrypt.hash(password, 8);
	console.log(password);
	console.log(hashedPassword);
	const comparedsd = await bcrypt.compare('123456789', '$2a$08$Bzqd1MmpaZ.VUK6mw4tWAOpvzpdj/DNka/G8HdZyfJoLPhNGX5sM.');
	console.log(comparedsd);
};

myFunction();
