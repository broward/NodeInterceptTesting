My first OOP programming language was Delphi (object pascal) which was introduced in 1995 (same time as java) and supported what is now know as "lamba functions".  This is a simple testing mechanism I used with Delphi, adapted for node.js

During my mocha tests, I can substitute a interceptor method for an existing method in the target object ("function two" is replaced by the "function intercept" in the diagram).

<br>
1) I can now do a couple of things within the intercept function.  I can throw an error, to test error handling in function one, which was an area I was having trouble with in node.js.  

    it("Test with injection, force an error", function() {
        assert.throws(
            function() {
                var qil = new Qil('');
                qil.two = function(arg) {
                    console.log('new two function throws error');

                    // inject our error 
                    throw new Error('my test error');
                    return arg;
                }

                // run the injected function
                assert(qil.one(1) === 1);
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
        qil.one = function(arg) {
            console.log('another new two function');

            // alter the value of argument
            arg.one = 'X';
            return arg;
        }

        // run the injected function
        assert(qil.modify().one === 'X');

        // verify it's been altered
        assert(qil.internal().one === 'X');
        done();
    }); 

