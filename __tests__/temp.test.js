const { farenheitToCelsius, celsisusToFarenheit } = require('../src/functions/functions');

describe('The function', () => {
	it('farenheitToCelsius is defined', () => {
		expect(farenheitToCelsius).toBeDefined();
	});
	it('farenheitToCelsius returns the correct temp value', () => {
		let actual = 9;
		let expected = farenheitToCelsius(48);
		expect(expected).toBeCloseTo(actual);
	});

	it('celsisusToFarenheit is defined', () => {
		expect(celsisusToFarenheit).toBeDefined();
    });
    it('celsiusToFarenheit returns the correct temp value', () => {
		let actual = 52;
		let expected = celsisusToFarenheit(11);
		expect(expected).toBeCloseTo(actual);
	});
});
