// 76. 最小覆盖子串，s中最小子串包含t中所有字符（不符合right++, 符合left++; 是否符合判断，字符串或者次数抵消为0）
const minWindow = (s, t) => {};

// 354. 俄罗斯套娃信封问题，宽高数组，求最大包含个数（宽升序高降序，h升序说明可以嵌套, 宽相同h是降序不会影响， dp）
const maxEnvelopes = (envelopes) => {};

// 11. 盛最多水的容器，容器高度数组，求两个高度组成容器最多的面积（头尾双指针，首次容器，低的往中间走，更高计算容器比较，因为更低不符合）
const maxArea = (heights) => {};

// 42. 接雨水, 高度数组，求所有能盛水体积（头尾双指针，低的中间走，递减累加容量，高于边界重新设定边界，继续）
const trap = (heights) => {};

//  322. 零钱兑换，硬币数组，用最少的个数凑目标金额（金额递增，金额大于硬币面值时，填充dp=min(dp, dp[j-icon]+1)）
const coinChange = (coins, amount) => {};

//  1143. 最长公共子序列（连个字符对应二维dp，字符串长度+1，从0空字符开始计算，dp的i对应字符串i-1位置）
const longestCommonSubsequence = (text1, text2) => {};

// 516. 最长回文子序列(可删) ()

// 5.最长回文子串（中心扩展法；二维dp boolean，递增子串长度和遍历i其实位置，判断子串是否回文）
const longestPalindrome = (str) => {};

// 53. 最大子数组和（一维dp，当前位置最大子数组和 dp[i-1]+cur 还是 cur 大）
const maxSubArray = (arr) => {};

// 121. 买卖股票的最佳时机, 买卖1次 （差值）
// 122. 买卖股票的最佳时机, 买卖n次 （dp_hold，dp_not_hold）
// 123. 买卖股票的最佳时机, 买卖2次 （4个状态，第一次买/卖，第二次买/卖，第二次依赖第一次）
// 124. 买卖股票的最佳时机, 买卖k次
// 714. 买卖股票的最佳时机, 买卖n次，含手续费（卖出时候计算收益需要减手续费）
// 309. 买卖股票的最佳时机, 买卖n次，含冷冻期（hold, nothold_frozen, nothold_notfrozen）
const maxProfit = (prices) => {};
