const { add, sub, mul, div, calculateTip } = require('../src/functions/functions');

describe('The function', () => {
	it('add is defined', () => {
		expect(add).toBeDefined();
	});
	it('sub is defined', () => {
		expect(sub).toBeDefined();
	});
	it('mul is defined', () => {
		expect(mul).toBeDefined();
	});
	it('div is defined', () => {
		expect(div).toBeDefined();
	});
	it('add returns the correct value', () => {
		let actual = 5;
		let expected = add(2, 3);
		expect(expected).toBe(actual);
	});
	it('sub returns the correct valu', () => {
		let actual = 5;
		let expected = sub(10, 5);
		expect(expected).toBe(actual);
	});
	it('mul returns the correct value', () => {
		let actual = 125;
		let expected = mul(25, 5);
		expect(expected).toBe(actual);
	});
	it('calculateTip', () => {
		expect(calculateTip).toBeDefined();
	});
	it('calculateTip returns the correct tip', () => {
		let actual = 3;
		let expected = calculateTip(10,30);
		expect(expected).toBe(actual);
    });
    
    it('calculateTip returns the correct tip', () => {
		let actual = 10;
		let expected = calculateTip(100);
		expect(expected).toBe(actual);
	});
});
