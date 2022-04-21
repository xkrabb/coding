function myNew(contr) {
    const args = Array.prototype.slice(arguments, 1);
    const obj = {};
    const Nop = function () {};

    Nop.prototype = contr.prototype;
    obj.__proto__ = new Nop();

    const res = contr.call(obj, ...args);

    return typeof res === 'object' ? res : obj;
}

function Fn(obj) {
    this.obj = obj;
    console.log('obj', this.obj);
}

const instance = myNew(Fn, { a: 1, b: 2, c: 3 });
console.log('keys', Object.keys(instance.obj || {}));

const new1 = (fn, ...arg) => {
    const obj = {};
    obj.prototype = Object.create(fn.prototype);
    const res = fn.call(obj, ...arg);
    return typeof res === 'object' ? res : obj;
};
