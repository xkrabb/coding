// 354.【面试真题】俄罗斯套娃信封问题【排序+最长上升子序列】
var maxEnvelopes = function (envelopes) {
    // w升序，h降序，确保w相同时候，h不满足升序
    envelopes.sort((e1, e2) => {
        if (e1[0] !== e2[0]) {
            return e1[0] - e2[0];
        } else {
            return e2[1] - e1[1];
        }
    });
    let max = 1;
    // 当前位置最大升序
    const dp = new Array(envelopes.length).fill(1);
    // w升序，如果h是递增序列及表示可以嵌套
    for (let i = 1; i < envelopes.length; i++) {
        for (let j = 0; j < i; j++) {
            if (envelopes[i][1] > envelopes[j][1]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        max = max > dp[i] ? max : dp[i];
    }
    return max;
};

// console.log(
//     maxEnvelopes([
//         [1, 2],
//         [2, 3],
//         [3, 4],
//         [4, 5],
//         [5, 6],
//         [5, 5],
//         [6, 7],
//         [7, 8]
//     ])
// );

// 674.最长连续递增序列【快慢指针】(300. 最长递增子序列)
var findLengthOfLCIS = function (nums) {
    const len = nums.length;
    let max = 1;
    if (len < 2) return len;
    const dp = new Array(len).fill(1);
    for (let i = 1; i < nums.length; i++) {
        // 如果是非连续，需要遍历比较i之前所有dp
        if (nums[i] > nums[i - 1]) {
            dp[i] = dp[i - 1] + 1;
        }
        max = dp[i] > max ? dp[i] : max;
    }
    return max;
};
// console.log(findLengthOfLCIS([1, 3, 5, 4, 7]));

// 128.最长连续序列 【哈希表】
var longestConsecutive = function (nums) {
    const nums_set = new Set(nums);
    // const map = new Map();
    // map key为数值，value为该数值最大连续
    let max = 0;
    // 只需要判断当前数值前后（连续）
    nums.forEach((num) => {
        // 未处理过才计算
        if (nums_set.has(num)) {
            let rangeMax = 1;
            let down = num - 1;
            let up = num + 1;
            while (nums_set.has(down)) {
                nums_set.delete(down);
                down--;
                rangeMax++;
            }
            while (nums_set.has(up)) {
                nums_set.delete(up);
                up++;
                rangeMax++;
            }
            max = Math.max(rangeMax, max);
        }
    });
    return max;
};

// 11.【面试真题】盛最多水的容器【哈希表】
var maxArea = function (height) {
    let left = 0;
    let right = height.length - 1;
    let max = 0;
    while (left < right) {
        max = Math.max(max, Math.min(height[left], height[right]) * (right - left));
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return max;
};

// 4.寻找两个正序数组的中位数【双指针】

// 16.删除有序数组中的重复项【快慢指针】

// 506.和为K的子数组【哈希表】

// 15. （三数之和）nSum问题【哈希表】

// 42.【面试真题】接雨水【暴力+备忘录优化】，左往右越高的计算水，右往左越高的计算水，直到相遇
var trap = function (height) {
    if (height.length < 3) return 0;
    let left = 0;
    let leftH = 0;
    let right = height.length - 1;
    let rightH = 0;
    let res = 0;
    // 容量需要两边比中间高，预设数组两边为容器边界，依次减少更新边界
    while (left < right) {
        const curLeftH = height[left];
        const curRightH = height[right];
        if (curLeftH < curRightH) {
            if (curLeftH < leftH) {
                res += leftH - curLeftH;
            } else {
                leftH = curLeftH;
            }
            left++;
        } else {
            if (curRightH < rightH) {
                res += rightH - curRightH;
            } else {
                rightH = curRightH;
            }
            right--;
        }
    }
    return res;
};
console.log('trap', trap([4, 2, 0, 3, 2, 5]));

// 55.跳跃游戏【贪心算法】
