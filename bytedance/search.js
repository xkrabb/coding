// 392.判断子序列【二分查找】: 双指针，
var isSubsequence = function (s, t) {
    const tMap = new Map();
    for (let i = 0; i < t.length; i++) {
        const key = t[i];
        if (tMap.has(key)) {
            tMap.get(key).push(i);
        } else {
            tMap.set(key, [i]);
        }
    }

    let pre = -1;
    for (let i = 0; i < s.length; i++) {
        const key = s[i];
        if (!tMap.has(key)) return false;
        const pos = tMap.get(key);
        // 数组中找到第一个比pre大的值（二分法查找）
        let left = 0;
        let right = pos.length;
        while (left < right) {
            const mid = left + Math.floor((right - left) / 2);
            if (pos[mid] > pre) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        if (left >= pos.length) return false;
        pre = pos[left];
    }
    return true;
};

console.log('isSubsequence', isSubsequence('abc', 'ahbgdc'));

// 34.在排序数组中查找元素的第一个和最后一个位置【二分搜索】
const searchFirst = (nums, target) => {
    let left = 0;
    let right = nums.length - 1;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] === target) {
            right = mid;
        } else {
            right = mid - 1;
        }
    }
    // left === right
    if (nums[left] === target) {
        return left;
    }
    return -1;
};
const searchLast = (nums, target) => {
    let left = 0;
    let right = nums.length - 1;
    while (left < right) {
        const mid = Math.floor((left + right + 1) / 2);
        if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] === target) {
            left = mid;
        } else {
            right = mid - 1;
        }
    }
    return left;
};

var searchRange = function (nums, target) {
    const res = [-1, -1];
    const leftIdx = searchFirst(nums, target);
    if (leftIdx === -1) return res;
    const rightIdx = searchLast(nums, target);
    return [leftIdx, rightIdx];
};

function binarySearch(nums, target, higher) {
    let left = 0;
    let right = nums.length - 1;
    let res = -1;
    // left/right可能会相等（如果left/right=mid，则left，right不会相等）
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (target > nums[mid] || (higher && target >= nums[mid])) {
            left = mid + 1;
            // 相等时候，左侧+1，会取到目标值最右侧位置
            res = mid;
        } else {
            // higher为false，相等时候右侧-1，最后left/right会相等，而res比left少了1
            right = mid - 1;
        }
    }
    console.log('higher ', higher, res);
    return res;
}

var searchRange1 = function (nums, target) {
    const leftIdx = binarySearch(nums, target, false) + 1;
    const rightIdx = binarySearch(nums, target, true);
    console.log('re ', leftIdx, rightIdx);
    if (leftIdx <= rightIdx && rightIdx < nums.length && nums[leftIdx] === target && nums[rightIdx] === target) {
        return [leftIdx, rightIdx];
    }
    return [-1, -1];
};

console.log(searchRange1([5, 7, 7, 8, 8, 10], 8));
console.log(searchRange1([8], 8));
