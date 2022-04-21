// Object.create，不支持第二个参数
function myCreate(proto) {
    function F() {}
    F.prototype = proto;
    return new F();
}

const create1 = (fn) => {
    const Fn = () => {};
    obj.prototype = fn;
    return new Fn();
};
