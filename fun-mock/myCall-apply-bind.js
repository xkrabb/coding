Function.prototype.myCall = function (context, ...args) {
    if (typeof this !== 'function') {
        throw new TypeError('Error');
    }

    const con = context || window;
    const symbolFn = Symbol();
    con[symbolFn] = this;
    const res = con[symbolFn](...args);
    delete con[symbolFn];

    return res;
};

Function.prototype.myApply = function (context, paramArr) {
    if (typeof this !== 'function') {
        throw new TypeError('Error');
    }

    const con = context || window;
    const fn = Symbol();
    con[fn] = this;
    let res = null;

    if (paramArr) {
        res = con[fn](...paramArr);
    } else {
        res = con[fn]();
    }
    delete con[fn];

    return res;
};

Function.prototype.myBind = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error');
    }

    const self = this;
    const con = context || window;
    const outParams = [...arguments].slice(1);
    const Nop = function () {};

    function boundFun(...args) {
        return self.myCall(this instanceof boundFun ? this : con, ...outParams, ...args);
    }

    Nop.prototype = this.prototype;
    // 断开原型链引用关系，避免修改时候相互影响
    boundFun.prototype = new Nop();

    return boundFun;
};

a = 1;
var obj = { a: 2 };
function printA(...params) {
    console.log('fun print a: ', this.a, ' whit params: ', ...params);
}

printA('no call');
printA.myCall(obj, 'with myCall');
printA.myApply(obj, ['with myApply']);
const fun = printA.myBind(obj, 'out params');
fun('inner params');
