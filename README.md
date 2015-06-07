During my mocha tests, I can substitute a interceptor method for an existing method in the target object ("function two" is replaced by the "function intercept" in the diagram).

<br>
1) I can now do a couple of things within the intercept function.  I can throw an error, to test error handling in function one, which was an area I was having trouble with in node.js.  

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
<br>

2) I can also alter the value of any object which passes through the intercept function.

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

