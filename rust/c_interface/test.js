
var ffi = require('ffi');
var path = require('path');

var lib = ffi.Library(path.join(__dirname, './target/release/libc_interface.so'), {
  get_number: ['int', ['int']]
});

var num = lib.get_number(0);
console.log(num);
