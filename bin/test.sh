#!/bin/bash
set -e
# Any subsequent(*) commands which fail will cause the shell script to exit immediately

echo "Deleting all node modules:"
rm -rf node_modules/

echo "Reinstalling node modules:"
npm install

echo "Testing code and coverage:"
./node_modules/.bin/istanbul cover node_modules/.bin/_mocha test/complete -- -R spec 

echo "Displaying results in browser:"
open coverage/lcov-report/index.html