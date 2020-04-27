const express = require('express');
const userRouter = require('./routers/userRouters');
const taskRouter = require('./routers/taskRouter');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening at port${port}`));
