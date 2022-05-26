function myCurry(fn) {
    const paramsLen = fn.length;
    return function curryFn(...args) {
        if (args.length === paramsLen) {
            return fn(...args);
        } else {
            return (...args2) => curryFn(...args, ...args2);
        }
    };
}

function add(a, b, c) {
    return a + b + c;
}
const c = myCurry(add);

console.log('c(1)(2)(3)', c(1)(2)(3));
console.log('c(1, 2)(3)', c(1, 2)(3));
