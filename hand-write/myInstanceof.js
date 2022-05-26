function myInstanceOf(left, right) {
    while (left.__proto__) {
        if (left.__proto__ === right.prototype) {
            return true;
        }
        left = left.__proto__;
    }
    return false;
}

const arr = new Array();

console.log(myInstanceOf(arr, Object));
