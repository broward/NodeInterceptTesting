'use strict';

// private variabl
var internal = {};
internal.one = '1';

// Constructor
function Qil(argv) {
    this.argv = argv;
}

// class methods
Qil.prototype.s1 = function(arg) {
    console.log('original s1');
    return this.s2(arg);
}

Qil.prototype.s2 = function(arg) {
    console.log('original s2');
    return arg;
}

Qil.prototype.s3 = function() {
	return internal;
}

Qil.prototype.s4 = function() {
	console.log('original s4');
	return this.s1(internal);
}

// export the class
module.exports = Qil;
