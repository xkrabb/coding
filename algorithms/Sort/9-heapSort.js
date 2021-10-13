// 将数组看做一个二叉树，构建最大/最小堆，取最大/最小值和数组最后一个元素交换，直到二叉树只有一个元素
// 不稳定； n log n； 1 空间； in-place

const heapify = (arr, i, len) => {
    const left = i * 2 + 1;
    const right = i * 2 + 2;
    let largest = i;
    if (left < len && arr[left] > arr[largest]) {
        largest = left;
    }
    if (right < len && arr[right] > arr[largest]) {
        largest = right;
    }
    if (largest !== i) {
        // 最大值需位置要调整
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        // largest 位置的数据已交换，此位置小的数，继续和子节点比较
        heapify(arr, largest, len);
    }
};

const buildMaxHeap = (arr, len) => {
    for (let i = Math.floor(len / 2); i >= 0; i--) {
        heapify(arr, i, len);
    }
};

const heapSort = (arr) => {
    let len = arr.length;
    buildMaxHeap(arr, len);
    for (let i = len - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        len--;
        heapify(arr, 0, len);
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
heapSort(arr);
console.log(arr);
