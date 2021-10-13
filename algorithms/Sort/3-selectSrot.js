// 选择未排序中最大的数，放到已排序的前面
// 不稳定； n^2； 1空间； in-place
const selectSort = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (i !== minIdx) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }
    }
};

const randomArr = (len) => {
    const res = [];
    for (let i = 0; i < len; i++) {
        res.push(Math.ceil(Math.random() * 100));
    }
    return res;
};

const arr = randomArr(6);
console.log(arr);
selectSort(arr);
console.log(arr);
