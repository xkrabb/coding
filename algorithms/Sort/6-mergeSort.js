// 将数组从中间拆成两个数组，直达长度为1，再根据大小将数组合并回去。
// 稳定； n log n ； n空间 ; out-place

const mergeSort = (arr, from, end) => {
    if (end <= from) {
        return;
    }
    const mid = Math.floor((end + from) / 2);
    mergeSort(arr, from, mid);
    mergeSort(arr, mid + 1, end);
    // 拆分完成后再合并
    merge(arr, from, mid, end);
};

const merge = (arr, from, mid, end) => {
    // 需要额外空间，用来合并被拆分的数组
    const leftArr = arr.slice(from, mid + 1);
    const rightArr = arr.slice(mid + 1, end + 1);
    let idx = from;
    while (leftArr.length > 0 && rightArr.length > 0) {
        if (leftArr[0] <= rightArr[0]) {
            arr[idx++] = leftArr.shift();
        } else {
            arr[idx++] = rightArr.shift();
        }
    }
    while (leftArr.length > 0) {
        arr[idx++] = leftArr.shift();
    }
    while (rightArr.length > 0) {
        arr[idx++] = rightArr.shift();
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
mergeSort(arr, 0, arr.length - 1);
console.log(arr);
