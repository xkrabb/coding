function myInstanceof(instance, Contr) {
    const ContrPrototype = Contr.prototype;
    let instanceProto = instance.__proto__;
    while (instanceProto) {
        if (instanceProto === ContrPrototype) {
            return true;
        }
        instanceProto = instanceProto.__proto__;
    }
    return false;
}

const arr = new Array();

console.log(myInstanceof(arr, Date));
