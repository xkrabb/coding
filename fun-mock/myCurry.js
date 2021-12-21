function myCurry(fn) {
    const len = fn.length;
    return function curryFn(...args) {
        if (args.length >= len) {
            fn(...args);
        } else {
            return (...args2) => curryFn(...args, ...args2);
        }
    };
}

function add(a, b, c) {
    console.log('sum result: ', a + b + c);
    return a + b + c;
}
const curryFn = myCurry(add);
curryFn(1)(2)(3);
curryFn(1, 2)(3);
curryFn(1)(2, 3);
