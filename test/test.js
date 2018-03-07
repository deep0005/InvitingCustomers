var sinon = require("sinon");
var path = require("path");
require("mocha");
require("mocha-sinon");
var assert = require("assert");
var reader = require("../lib/reader.js");

console.log("------ Test 1 ------");
console.log("Running test with invalid file path");
var err;
try{
    reader.print({path: "../data"});
}catch(_err){
    err = _err;
}
if(err){
    if(assertEquals(err.message, "Invalid file path --> ../data")){
        console.log("Test 1 Passed");
    }
}else{
    console.log("Test 1 failed");
}

console.log("-------------------");

console.log("------ Test 2 ------");
console.log("Running test with empty file path");
var err;
try{
    reader.print({path: ""});
}catch(_err){
    err = _err;
}
if(err){
    if(assertEquals(err.message, "Invalid file path")){
        console.log("Test 2 Passed");
    }
}else{
    console.log("Test 2 failed");
}

console.log("-------------------");


it('Providing empty file', () => {
    // "spy" on `console.log()`
    let spy = sinon.spy(console, 'log');
  
    // call the function that needs to be tested
    reader.print({path: path.join(__dirname, "/emptydata.txt")});
  
    // assert that it was called with the correct value
    assert("No data in the file.");
  
    // restore the original function
    spy.restore();
});


it('Providing file with invalid data', () => {
    // "spy" on `console.log()`
    let spy = sinon.spy(console, 'log');
  
    // call the function that needs to be tested
    reader.print({path: path.join(__dirname, "/invaliddata.txt")});
  
    // assert that it was called with the correct value
    assert("User ID is  " + 12 + " and Name is " + "Christina McArdle");
    assert("User ID is  " + 5 + " and Name is " + "Nora Dempsey");
    // restore the original function
    spy.restore();
});

function assertEquals(obj1, obj2){
    return obj1 === obj2;
}