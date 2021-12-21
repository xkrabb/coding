Array.prototype.myReduce = function (cb, initialValue) {
    if (!Array.isArray(this)) {
        throw TypeError('need array');
    }
    let res = initialValue;
    this.forEach((cur, idx) => {
        res = cb(res, cur, idx);
    });
    return res;
};

const sum = [1, 2, 3, 4].myReduce((res, cur, idx) => {
    return cur + res;
}, 0);

console.log('sum ', sum);
