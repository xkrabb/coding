Function.prototype.myCall = function (context, ...args) {
    const ctx = context || window;
    const fn = Symbol();
    ctx[fn] = this;
    const res = ctx[fn](...args);
    delete ctx[fn];
    return res;
};

Function.prototype.myApply = function (context, arrParams) {
    const ctx = context || window;
    const fn = Symbol();
    ctx[fn] = this;
    let res;
    if (arrParams) {
        res = ctx[fn](...arrParams);
    } else {
        res = ctx[fn]();
    }
    delete ctx[fn];
    return res;
};

Function.prototype.myBind = function (context, ...args1) {
    const ctx = context || window;
    const that = this;

    const bundFn = function (...args2) {
        return that.call(this instanceof bundFn ? this : ctx, ...args1, ...args2);
    };

    const noop = function () {};
    noop.prototype = that.prototype;
    bundFn.prototype = new noop();

    return bundFn;
};

a = 1;
const obj = {
    a: 2
};

function printA(...param) {
    console.log('a:', this.a);
    console.log('params:', ...param);
}
printA.myCall(obj, 1, 2);
printA.myApply(obj);
const fn = printA.myBind(obj, 'hello');
fn('world');
