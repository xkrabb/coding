// 最长回文子串
// 暴力解法：枚举所有子串，并判断是否是回文且大于之前的最大子串
function solution1(str) {
    if (str.length < 2) {
        return str;
    }
    let maxLen = 1;
    let begin = 0;
    // 最后一个留给j
    for (let i = 0; i < str.length - 1; i++) {
        for (let j = i + 1; j < str.length; j++) {
            if (isPalindrome(str, i, j) && j - i + 1 > maxLen) {
                maxLen = j - i + 1;
                begin = i;
            }
        }
    }
    return str.slice(begin, begin + maxLen);
}

function isPalindrome(str, left, right) {
    while (left < right) {
        if (str[left++] !== str[right--]) {
            return false;
        }
    }
    return true;
}

const str = 'aaaa';
console.log(solution1(str));

// 中心扩散法：选定字段中心，向两边扩展判断是否为回文，扩散时分奇数/偶数情况（中心不一样）
function solution2(str) {
    if (str.length < 2) {
        return str;
    }
    let maxLen = 1;
    let begin = 0;
    // 最后一个留给偶数情况扩展
    for (let i = 0; i < str.length - 1; i++) {
        const oddLen = expandCenter(str, i, i);
        const evenLen = expandCenter(str, i, i + 1);
        const len = Math.max(oddLen, evenLen);
        if (len > maxLen) {
            maxLen = len;
            // 需要画图理解下
            begin = i - Math.floor((len - 1) / 2);
        }
    }
    return str.slice(begin, begin + maxLen);
}

function expandCenter(str, left, right) {
    while (left >= 0 && right < str.length && str[left] === str[right]) {
        left--;
        right++;
    }
    return right - left - 1;
}

console.log(solution2(str));

// 动态规划：回文去掉两头还是回文，所以可以通过子回文+两头字符是否相等转移
// 转移关系：dp[i][j] = dp[i+1][j-1] 且 s[i]===s[j]
// 边界条件子串长度大于1：j-1 - (i+1) + 1 < 2
// 状态转义方程： dp[i][j] = s[i] === s[j] and (j - i < 3 or dp[i+1][j-1])
function solution3(str) {
    const len = str.length;
    if (len < 2) {
        return str;
    }
    const dp = new Array(len);
    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(len);
        // 对角线是单个字符，肯定是回文
        dp[i][i] = true;
    }
    let begin = 0;
    let maxLen = 1;
    // 对角线填充一边即可，根据长度遍历，否则 dp[i+1][j-1]一直是undefined
    for (let subLen = 2; subLen <= len; subLen++) {
        for (let i = 0; i < len - subLen + 1; i++) {
            const j = subLen + i - 1;

            if (str[i] !== str[j]) {
                dp[i][j] = false;
            } else {
                // 两边相等，中间只剩0或1个字符
                if (j - i < 3) {
                    dp[i][j] = true;
                } else {
                    dp[i][j] = dp[i + 1][j - 1];
                }
            }
            if (dp[i][j] && j - i + 1 > maxLen) {
                maxLen = j - i + 1;
                begin = i;
            }
        }
    }
    return str.slice(begin, begin + maxLen);
}

console.log(solution3(str));

// manacher算法： 预处理字符串成奇数(最长回文也肯定是奇数)，原始最长可扩展为扩展后最长回文的（len-1）/ 2
//
// 变量说明：
// i: 遍历下标；
// maxRight: 当前以中心扩散能走到的最右边下标；
// center: 与maxRight对应回文中心下标；
// mirror: i关于center的映射下标；
// p[i]: 以i为中心最长可以扩散步长；
//
// 遍历过程：
// 情况1：i >= maxRight,中心扩散后更新maxRight；
// 情况2： i < maxRight, 根据mirror的位置分三种情况：综合表达式：p[i] = min(p[mirror], maxRight - i)，然后中心扩散
//  1. p[mirror] < marRight - i，p[i] = p[mirror]
//  2. p[mirror] === marRight - i，p[i]至少是maxRight-i，从maxRight继续扩散；
//  3.  p[mirror] > marRight - i，p[i] = maxRight - i;

function solution4(str) {}
