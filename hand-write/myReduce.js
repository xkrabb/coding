function myReduce(arr, cb, init) {
    let res = init;
    arr.forEach((ele, index) => {
        res = cb(res, ele, index);
    });
    return res;
}

const arr = [1, 2, 3, 4];
const sum = myReduce(
    arr,
    (res, cur) => {
        return res + cur;
    },
    5
);

console.log('reduce sum ', sum);
