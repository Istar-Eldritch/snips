/**
 *  Trampoline helper function:
 *  https://en.wikipedia.org/wiki/Trampoline_(computing)
 */ 

function trampoline(f) {
    while (f && f instanceof Function) {

        f = f.apply(f.context, f.args);

    }
    return f;
}


function factorial(n) {
  function _factorial(n, acc) {
    if(n) {
      return _factorial.bind(null, n - 1, acc * n)
    } else {
      return acc;
    }
  }
  return trampoline(_factorial.bind(null, n, 1));
}


console.log(factorial(50000));


