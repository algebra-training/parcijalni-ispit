'use strict';

var lcgRandom = require('../lcg-random');
var expect = require('chai').expect;

describe('lcg-random', function () {
	it('should return a function that returns numbers between 0 and 1', function () {
		var generator = lcgRandom({seed: 42});
		for (var i = 0; i < 1000; ++i) {
			var randomNumber = generator();
			expect(randomNumber).to.be.at.least(0);
			expect(randomNumber).to.be.below(1);
		}
	});

	it('should return the same functions for same seed', function () {
		expect(lcgRandom({seed: 42})()).to.equal(lcgRandom({seed: 42})());
	});

	it('should return a function that returns many different numbers', function () {
		var generator = lcgRandom();
		var results = [true];
		var state = 0;
		for (var i = 0; i < 1000; ++i) {
			state = generator(state);
			expect(results[state]).to.not.exist;
			results[state] = true;
		}
	});

	it('should support Lehmer random number generators', function () {
		var generator = lcgRandom({
			seed: 123456,
			multiplier: Math.pow(7, 5),
			modulus: Math.pow(2, 31)-1,
			increment: 0
		});
		expect(Math.floor(generator()*1000)).to.equal(966);
		expect(Math.floor(generator()*1000)).to.equal(129);
	});

	it('it should not allow negative multiplier', function () {
		var options = { seed: 23, increment: 7, multiplier: 0, modulus: 111 };
		expect(function () { lcgRandom(options); }).to.throw(Error);
	});

	it('it should not allow multiplier greater than modulus', function () {
		var options = { seed: 23, increment: 7, multiplier: 111, modulus: 111 };
		expect(function () { lcgRandom(options); }).to.throw(Error);
	});

	it('it should not allow negative increment', function () {
		var options = { seed: 23, increment: -1, multiplier: 7, modulus: 111 };
		expect(function () { lcgRandom(options); }).to.throw(Error);
	});

	it('it should not allow increment greater than modulus', function () {
		var options = { seed: 23, increment: 111, multiplier: 7, modulus: 111 };
		expect(function () { lcgRandom(options); }).to.throw(Error);
	});

	it('it should not allow negative seed', function () {
		var options = { seed: -1, increment: 7, multiplier: 7, modulus: 111 };
		expect(function () { lcgRandom(options); }).to.throw(Error);
	});

	it('it should not allow seed greater than modulus', function () {
		var options = { seed: 111, increment: 7, multiplier: 7, modulus: 111 };
		expect(function () { lcgRandom(options); }).to.throw(Error);
	});

	it('it should not allow seed 0 and increment 0', function () {
		var options = { seed: 0, increment: 0 };
		expect(function () { lcgRandom(options); }).to.throw(Error);
	});

});
