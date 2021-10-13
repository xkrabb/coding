// 如果左侧大于右侧，则交换，直到所有都有序。大的数，会随着遍历，往右侧冒。
// 稳定，相对位置确定后不改变; n^2 ; 1空间； in-place
const bubbleSort = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        let flag = false;
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                flag = true;
                // 交换位置
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
        // 如果没有交过换过说明已经有序
        if (!flag) {
            break;
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
bubbleSort(arr);
console.log(arr);
