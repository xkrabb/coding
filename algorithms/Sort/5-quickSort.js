// 分治思想，选定一个数据，利用双指针，根据大小将数据放到标定数据左右两侧，拆分后的数组重复上述操作，直到有序
// 不稳定  n log n; log n空间； in-place

const quickSort = (arr, left, right) => {
    if (left < right) {
        const mid = partition(arr, left, right);
        quickSort(arr, left, mid - 1);
        quickSort(arr, mid + 1, right);
    }
};

// 根据标定数值，移动数组，返回标定数值所在位置
const partition = (arr, left, right) => {
    // 取开始值为标定值，找到标定值在数组的排序位置
    const cursor = arr[left];
    while (left < right) {
        // 值相同也需要继续移动
        while (left < right && arr[right] >= cursor) {
            right--;
        }
        // 右侧小于标定值，将小值移到左侧
        arr[left] = arr[right];
        while (left < right && arr[left] <= cursor) {
            left++;
        }
        arr[right] = arr[left];
    }
    // left === right 结束
    arr[left] = cursor;
    return left;
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
quickSort(arr, 0, arr.length - 1);
console.log(arr);
