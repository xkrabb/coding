// 遍历，将遍历到数据，插入到已排序的正确位置；已排序数组会移动多次
// 稳定； n^2； 1空间； in-place
const insertSort = (arr) => {
    for (let i = 1; i < arr.length; i++) {
        let cur = arr[i];
        let j = i - 1;
        for (; j >= 0; j--) {
            if (cur < arr[j]) {
                // 游标数位置左移，原数据右移
                arr[j + 1] = arr[j];
            } else {
                break;
            }
        }
        arr[j + 1] = cur;
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
insertSort(arr);
console.log(arr);
