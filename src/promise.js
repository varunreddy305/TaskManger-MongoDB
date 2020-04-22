const add = (a, b) => {
	return new Promise((resolve, reject) => {
		a && b ? resolve(a + b) : reject('Incorrect data');
	});
};

add(-98)
	.then(res => {
		console.log(res);
	})
	.catch(e => {
		console.log(e);
	});
