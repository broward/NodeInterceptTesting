'use strict';

// private variabl
var internal = {};
internal.one = '1';

// Constructor
function Qil(argv) {

    // always initialize all instance properties
    this.argv = argv;
    this.one = Qil.prototype.s1;
    this.two = Qil.prototype.s2
    this.internal = Qil.prototype.s3;
    this.modify = Qil.prototype.s4;

}

// class methods
Qil.prototype.s1 = function(arg) {
    console.log('original s1');
    return this.two(arg);
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
	return this.one(internal);
}

// export the class
module.exports = Qil;
