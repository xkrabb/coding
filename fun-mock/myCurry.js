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

const curry1 = (fn) => {
    const len = fn.length;
    return function f(...arg1) {
        if (arg1.length >= len) {
            return fn(...arg1);
        } else {
            return (arg2) => f(...arg1, arg2);
        }
    };
};

const c = curry1(add);
c(1, 2)(3);
c(1)(2)(3);
