// 计数排序升级版，将一个范围内数组放到一个桶中，再将桶内数据排序，拼接所有桶；
//  稳定； n + k时间， n + k 空间； out-place； 稳定
const bucketSort = (arr) => {
    if (arr.length < 2) {
        return arr;
    }
    let minVal = arr[0];
    let maxVal = arr[0];
    for (let i = 0; i < arr.length; i++) {
        const val = arr[i];
        if (val > maxVal) {
            maxVal = val;
        }
        if (val < minVal) {
            minVal = val;
        }
    }

    const BUCKET_SIZE = 5;
    const bucketCount = Math.floor((maxVal - minVal) / BUCKET_SIZE) + 1;
    // const buckets = new Array(BUCKET_SIZE).fill([]);
    const buckets = [];
    for (let i = 0; i < BUCKET_SIZE; i++) {
        buckets[i] = [];
    }

    // 入桶
    for (let i = 0; i < arr.length; i++) {
        buckets[Math.floor((arr[i] - minVal) / bucketCount)].push(arr[i]);
    }

    // 桶内排序，拼接返回
    const res = [];
    for (let i = 0; i < buckets.length; i++) {
        buckets[i].sort((a, b) => a - b);
        res.push(...buckets[i]);
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

console.log(bucketSort(arr));
