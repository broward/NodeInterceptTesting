var should = require('chai').should();
var expect = require('chai').expect();
var assert = require('assert');
var Qil = require('../qil.js');


describe("Interceptor Suite", function() {

    // Test for existence of the project and important variables
    describe("Method Test", function() {

        it("Verify original functionality", function(done) {
            var qil = new Qil('');
            assert(qil.s1(1) === 1);
            done();
        });

        it("Test with injection, verify same functionality", function(done) {
            var qil = new Qil('');

            // inject our empty function
            qil.s2 = function(arg) {
                console.log('new two function');
                return arg;
            }

            // verify nothing has changed
            assert(qil.s1(1) === 1);
            done();
        });

        it("Test with injection, alter arguments", function(done) {
            var qil = new Qil('');

            // inject our function
            qil.s2 = function(arg) {
                console.log('new two function changes argument');
                arg = 5;
                return arg;
            }

            // verify the argument was changed.
            assert(qil.s1(1) === 5);
            done();
        });

        it("Test with injection, force an error", function() {
            var qil = new Qil('');

            // inject our function
            qil.s2 = function(arg) {
                console.log('new two function throws error');
                throw new Error('my test error');
                return arg;
            }

            assert.throws(
                function() {
                    // run injected function, should throw an error
                    assert(qil.s1(1) === 1);
                },
                function(err) {
                    console.log('threw an error');
                    return true;
                }
            );
        });
    });

    // Test for existence of the project and important variables
    describe("Private Variable Test", function() {

        it("Verify original value", function(done) {
            var qil = new Qil('');
            assert(qil.s3().one === '1');
            done();
        });

        it("Test with injection, verify original functionality", function(done) {

            // inject our new empty function
            var qil = new Qil('');
            qil.s1 = function(arg) {
                console.log('new one function');
                return arg;
            }

            // run the function
            assert(qil.s3().one === '1');

            // verify internal object is unchanged
            assert(qil.s4().one === '1');
            done();
        });

        it("Test with injection, verify altered functionality", function(done) {
            var qil = new Qil('');

            // inject our new function
            qil.s1 = function(arg) {
                console.log('another new one function');
                arg.one = 'X';
                return arg;
            }

            // verify internal object was changed
            assert(qil.s4().one === 'X');

            // verify that it stays changed
            assert(qil.s3().one === 'X');
            done();
        });
    });
});
