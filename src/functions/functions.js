const add = (a, b) => {
	return a + b;
};

const sub = (a, b) => {
	return a - b;
};

const mul = (a, b) => {
	return a * b;
};

const div = (a, b) => {
	return a / b;
};

const calculateTip = (total, tip = 10) => (total * tip) / 100;

const farenheitToCelsius = temp => Math.round((temp - 32) / 1.8);

const celsisusToFarenheit = temp => Math.round((temp * 1.8) + 32);

module.exports = { add, sub, mul, div, calculateTip, farenheitToCelsius, celsisusToFarenheit };
