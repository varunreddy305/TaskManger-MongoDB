const value = async () => {
	const sum = await add(1, 2);
	const sum2 = await add(sum, 2);
	const sum3 = await add(sum2, 5);
	return sum3;
};

const add = (a, b) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(a + b);
		}, 2000);
	});
};

value()
	.then(res => {
		console.log(res);
	})
	.catch(e => {
		console.log('e', e);
	});
