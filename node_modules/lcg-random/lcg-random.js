'use strict';

function createLCGenerator(options) {
	options = options || {};
	var seed = typeof options.seed === 'undefined' ?
		1 : options.seed;
	var a = typeof options.multiplier === 'undefined' ? 
		16807 : options.multiplier;
	var c = typeof options.increment === 'undefined' ? 
		0 : options.increment;
	var m = typeof options.modulus === 'undefined' ?
		2147483647 : options.modulus;
	
	if (a <= 0) { throw Error("`multiplier` must be strictly larger than 0"); }
	if (a >= m) { throw Error("`multiplier` must be smaller than `modulus`"); }
	if (c < 0) { throw Error("`increment` must not be negative"); }
	if (c >= m) { throw Error("`increment` must be smaller than `modulus`"); }
	if (seed < 0) { throw Error("`seed` must not be negative"); }
	if (seed >= m) { throw Error("`seed` must be smaller than `modulus`"); }
	if (seed === 0 && c === 0) {
		throw Error("`seed` cannot be 0 if `increment` is 0");
	}

	var state = Math.abs(seed);
	return function () {
		var result = (state*a + c) % m;
		state = result;
		return result / m;
	};
}

module.exports = createLCGenerator;
