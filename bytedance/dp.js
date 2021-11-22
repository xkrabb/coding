// 300.最长递增子序列
var lengthOfLIS = function (nums) {
    if (nums.length < 2) return nums.length;
    const dp = new Array(nums.length).fill(1);
    let max = 1;
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            // 当前数大于遍历位置数据，则递增长度+1
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        max = Math.max(dp[i], max);
    }
    return max;
};

// 322.【面试真题】 零钱兑换，dp[i] = min(dp[i-icon]) + 1 (icon枚举所有币种)
var coinChange = function (coins, amount) {
    if (amount < 1) return 0;
    const dp = new Array(amount + 1).fill(Number.MAX_SAFE_INTEGER);
    dp[0] = 0;
    for (let i = 1; i <= amount; i++) {
        for (let j = 0; j < coins.length; j++) {
            if (i - coins[j] >= 0) {
                dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
            }
        }
    }
    return dp[amount] === Number.MAX_SAFE_INTEGER ? -1 : dp[amount];
};
console.log('coinChange', coinChange([186, 419, 83, 408], 6249));

// 1143.【面试真题】 最长公共子序列
var longestCommonSubsequence = (text1, text2) => {
    const len1 = text1.length;
    const len2 = text2.length;
    const dp = new Array(len1 + 1).fill(0).map(() => new Array(len2 + 1).fill(0));
    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= i; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[len1][len2];
};

// 72.编辑距离
var minDistance = function (word1, word2) {
    const len1 = word1.length;
    const len2 = word2.length;
    // word1的i位置，和word2的j位置最小标记距离
    const dp = new Array(len1 + 1).fill(0).map(() => new Array(len2 + 1).fill(0));
    for (let i = 0; i < len1; i++) {
        // word1的i长度和word2的空
        dp[i][0] = i;
    }
    for (let j = 0; j < len2; j++) {
        dp[0][j] = j;
    }
    // 空字符占了第一个位，第一个字符需要从1开始
    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            const c1 = dp[i - 1][j] + 1; // word1增加一个字符word2
            const c2 = dp[i][j - 1] + 1; // word1减一个字符到word2
            let c3 = dp[i - 1][j - 1]; // i和j位置字符相同，则不变化
            if (word1[i - 1] !== word2[j - 1]) {
                c3 += 1; // 字符相同经过一次替换
            }
            dp[i][j] = Math.min(c1, c2, c3);
        }
    }
    return dp[len1][len2];
};

console.log('min distance', minDistance('horse', 'ros'));

// 516.【面试真题】最长回文子序列
var longestPalindromeSubseq = function (s) {
    // 0-i可能最长回文
    const dp = new Array(s.length).fill(1);
    for (let i = 1; i < s.length; i++) {
        if (s[0] === s[i]) {
            dp[i] = dp[i - 1] + 1;
        } else {
            dp[i] = dp[i - 1];
        }
    }
    return dp[s.length - 1];
};
console.log('longestPalindromeSubseq', longestPalindromeSubseq('cbbd'));

// 53.【面试真题】最大子序和
const maxSubArray = (arr) => {
    const dp = new Array(arr.length);
    dp[0] = arr[0];
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        dp[i] = Math.max(dp[i - 1] + arr[i], arr[i]);
        max = Math.max(max, dp[i]);
    }
    return max;
};
console.log('maxSubArray', maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));

// 121.【面试真题】 买卖股票的最佳时机，购买一次，购买两次，购买多次，购买指定k次，有手续费，有冷冻期
var maxProfit = function (prices) {
    const dp_hold = new Array(prices.length);
    const dp_not_hold = new Array(prices.length);
    dp_hold[0] = -prices[0];
    dp_not_hold[0] = 0;
    for (let i = 1; i < prices.length; i++) {
        // 当天持有分：之前持有和之前不持有+当天买入
        dp_hold[i] = Math.max(dp_hold[i - 1], dp_not_hold[i - 1] - prices[i]);
        dp_not_hold[i] = Math.max(dp_not_hold[i - 1], dp_hold[i - 1] + prices[i]);
    }
    return dp_not_hold[prices.length - 1];
};

console.log('maxProfit', maxProfit([7, 1, 5, 3, 6, 4]));
