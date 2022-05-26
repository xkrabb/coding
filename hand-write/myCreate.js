// Object.create;
function myCreate(proto) {
    function Noop() {}
    Noop.prototype = proto;
    return new Noop();
}
