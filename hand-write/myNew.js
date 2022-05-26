function myNew(Constr, ...args) {
    let obj = {};
    obj.__proto__ = Object.create(Contr.prototype);
    const res = Constr.call(obj, ...args);
    return typeof res === 'object' ? res : obj;
}
