// 开辟比最大值点的空间，遍历数组元素值，放到开辟空间对应序号上；适用重复多，最大值不是很大数组；
// 稳定； n + k时间， k 空间； out-place； 稳定
const countSort = (arr) => {
    let maxVal = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > maxVal) {
            maxVal = arr[i];
        }
    }
    const countArr = new Array(maxVal + 1).fill(undefined);
    for (let i = 0; i < arr.length; i++) {
        if (countArr[arr[i]] === undefined) {
            countArr[arr[i]] = 0;
        }
        countArr[arr[i]]++;
    }
    const res = [];
    for (let j = 0; j < maxVal + 1; j++) {
        while (countArr[j] !== undefined && countArr[j] > 0) {
            res.push(j);
            countArr[j]--;
        }
    }
    return res;
};

const randomArr = (len) => {
    const res = [];
    for (let i = 0; i < len; i++) {
        res.push(Math.ceil(Math.random() * 100));
    }
    return res;
};

const arr = randomArr(16);
console.log(arr);

console.log(countSort(arr));
