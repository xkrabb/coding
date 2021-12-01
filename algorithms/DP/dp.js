var numberOfArithmeticSlices = function (nums) {
    if (nums.length < 3) return 0;
    // 4: 2个3，1个4，5：3个3，2个4，一个5
    const d = nums[0] - nums[1];
    let count = 0; // 最长连续等差
    for (let i = 1; i < nums.length - 1; i++) {
        if (nums[i] - nums[i + 1] === d) {
            count = count + 1;
        } else {
            break;
        }
    }
    return count;
};

console.log('numberOfArithmeticSlices', numberOfArithmeticSlices([1, 2, 3, 4, 5, 6]));
