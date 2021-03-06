My first OOP programming language was Delphi (object pascal) which was introduced the same year as java (1995).  Delphi supported what is now known as "lamba functions" and this is a simple testing mechanism I used with Delphi, adapted for node.js.

During my mocha tests, I can substitute an interceptor method for an existing method in the target object (in the diagram, "function intercept" replaces "function two"). I can now do a couple of things within the intercept function:

<br>
1) I can throw an arbitrary error to test error handling in function one, for better code coverage.  

    it("Test with injection, force an error", function() {
            var qil = new Qil('');

            // inject our function
            qil.two = function(arg) {
                console.log('new two function throws error');
                throw new Error('my test error');
                return arg;
            }

            assert.throws(
                function() {
                    // run injected function, should throw an error
                    assert(qil.one(1) === 1);
                },
                function(err) {
                    console.log('threw an error');
                    return true;
                }
            );
        });

<br>

2) I can alter the value of any object which passes through the intercept function.

    it("Test with injection, verify altered functionality", function(done) {
            var qil = new Qil('');

            // inject our new function
            qil.one = function(arg) {
                console.log('another new one function');
                arg.one = 'X';
                return arg;
            }

            // run the function
            assert(qil.modify().one === 'X');

            // verify internal object was changed
            assert(qil.internal().one === 'X');
            done();
        });

