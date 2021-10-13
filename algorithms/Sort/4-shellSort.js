// 从插入排序改进而来，调整插入比较间隔，直到间隔为1
// 不稳定； n log n； 1空间； in-place
const shellSort = (arr) => {
    // 计算增量
    let gap = 1;
    const len = arr.length;
    while (gap < len / 3) {
        gap = gap * 3 + 1;
    }
    for (; gap > 0; gap = Math.floor(gap / 3)) {
        for (let i = gap; i < len; i++) {
            let j = i;
            const cur = arr[i];
            while (j - gap >= 0 && arr[j - gap] > cur) {
                arr[j] = arr[j - gap];
                j = j - gap;
            }
            arr[j] = cur;
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
shellSort(arr);
console.log(arr);
