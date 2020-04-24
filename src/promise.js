const add = (a, b) => {
	return new Promise((resolve, reject) => {
		a && b ? resolve(a + b) : reject('Incorrect data');
	});
};

const subract = (a, b, callback) => {
	if (a < 0 || b < 0) {
		return callback('Please provide valid numbers', undefined);
	} else {
		return callback(undefined, a - b);
	}
};

subract(8, 7, (err, data) => {
	if (err) {
		return console.log(err);
	}
	console.log(data);
});

add(9, 8)
	.then(res => {
		console.log(res);
		return add(res, 5);
	})
	.then(res2 => {
		console.log(res2);
	})
	.catch(e => {
		console.log(e);
	});
