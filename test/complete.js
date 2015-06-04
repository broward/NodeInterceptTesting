var should = require('chai').should();
var expect = require('chai').expect();
var assert = require('assert');
var Qil = require('../qil.js');


describe("Interceptor Suite", function() {

    // Test for existence of the project and important variables
    describe("Method Test", function() {

        it("Verify original functionality", function(done) {
            var qil = new Qil('');
            assert(qil.sum(1) === 1);
            done();
        });

        it("Test with injection, verify same functionality", function(done) {
            var qil = new Qil('');
            qil.sum2 = function(arg) {
                console.log('new sum2 function');
                return arg;
            }
            assert(qil.sum(1) === 1);
            done();
        });

        it("Test with injection, alter arguments", function(done) {
            var qil = new Qil('');
            qil.sum2 = function(arg) {
                console.log('new sum2 function changes argument');
                arg = 5;
                return arg;
            }
            assert(qil.sum(1) === 5);
            done();
        });

        it("Test with injection, force an error", function() {
            assert.throws(
                function() {
                    var qil = new Qil('');
                    qil.sum2 = function(arg) {
                        console.log('new sum2 function throws error');
                        throw new Error('my test error');
                        return arg;
                    }
                    assert(qil.sum(1) === 1);
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
            assert(qil.internal().one === '1');
            done();
        });

        it("Test with injection, verify original functionality", function(done) {
            var qil = new Qil('');
            qil.sum = function(arg) {
                console.log('new sum function');
                return arg;
            }
            assert(qil.modify().one === '2');
            assert(qil.internal().one === '2');
            done();
        });

        it("Test with injection, verify altered functionality", function(done) {
            var qil = new Qil('');
            qil.sum = function(arg) {
                console.log('another new sum function');
                arg.one = 'X';
                return arg;
            }
            assert(qil.modify().one === 'X');
            assert(qil.internal().one === 'X');
            done();
        }); 
    });
});
