// 基数排序，将个位，十位，百位... 按位数从高到底排序
// 稳定； n * k时间， n + k 空间； out-place； 稳定

const radixSort = (arr) => {
    const radixArr = [];
    for (let i = 0; i < 10; i++) {
        radixArr[i] = [];
    }
    const maxVal = Math.max(...arr);
    let mod = 10;
    let dev = 1;
    let pos = 0;
    while (maxVal / dev > 1) {
        for (let i = 0; i < arr.length; i++) {
            const val = parseInt((arr[i] % mod) / dev);
            radixArr[val].push(arr[i]);
        }
        pos = 0;
        for (let i = 0; i < radixArr.length; i++) {
            const values = radixArr[i];
            while (values.length > 0) {
                arr[pos++] = values.shift();
            }
        }

        mod *= 10;
        dev *= 10;
    }
};

const randomArr = (len) => {
    const res = [];
    for (let i = 0; i < len; i++) {
        res.push(Math.ceil(Math.random() * 100));
    }
    return res;
};

const arr = randomArr(12);
console.log(arr);
radixSort(arr);
console.log(arr);
