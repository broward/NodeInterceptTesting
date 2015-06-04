'use strict';

// private variabl
var internal = {};
internal.one = '1';

// Constructor
function Qil(argv) {

    // always initialize all instance properties
    this.argv = argv;
    this.sum = Qil.prototype.s;
    this.sum2 = Qil.prototype.s2
    this.internal = Qil.prototype.s3;
    this.modify = Qil.prototype.s4;

}

// class methods
Qil.prototype.s = function(arg) {
    console.log('original s1');
    return this.sum2(arg);
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
	internal.one = '2';
	return this.sum(internal);
}

// export the class
module.exports = Qil;
