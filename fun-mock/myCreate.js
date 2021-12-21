// Object.create，不支持第二个参数
function myCreate(proto) {
    function F() {}
    F.prototype = proto;
    return new F();
}
