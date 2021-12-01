// 5.【面试真题】最长回文子串【双指针】
var longestPalindrome = (str) => {
    if (str.length < 2) return str;
    let begin = 0;
    let maxLen = 1;
    const expandCenter = (left, right) => {
        while (left >= 0 && right < str.length) {
            if (str[left] === str[right]) {
                if (right - left + 1 > maxLen) {
                    begin = left;
                    maxLen = right - left + 1;
                }
                left--;
                right++;
            } else {
                return;
            }
        }
    };
    for (let i = 1; i < str.length; i++) {
        expandCenter(i, i);
        expandCenter(i, i - 1);
    }
    return str.slice(begin, begin + maxLen);
};

console.log(longestPalindrome('babad'));

// 14.最长公共前缀【双指针】

// 3.无重复字符的最长子串【双指针】

// 76.【面试真题】最小覆盖子串【滑动窗口】
var minWindow = function (s, t) {
    const tMap = new Map();
    for (const c of t) {
        tMap.set(c, (tMap.get(c) || 0) + 1);
    }
    // 校验串包含数量减1，用于判断是否都包含t串
    let needTypes = tMap.size;
    let res = '';
    let l = 0;
    let r = 0;
    while (r < s.length) {
        const c = s[r];
        if (tMap.has(c)) {
            tMap.set(c, tMap.get(c) - 1);
            if (tMap.get(c) === 0) {
                needTypes--;
            }
        }
        // t的字符都被抵消了，说明满足
        while (needTypes === 0) {
            const newStr = s.substring(l, r + 1);
            if (!res || newStr.length < res.length) res = newStr;
            const c1 = s[l];
            if (tMap.has(c1)) {
                // 之前可能减到负数
                tMap.set(c1, tMap.get(c1) + 1);
                if (tMap.get(c1) === 1) {
                    needTypes++;
                }
            }
            l++;
        }

        r++;
    }
    return res;
};
console.log('minWindow', minWindow('ADOBECODEBANCO', 'ABC'));
// console.log('minWindow', minWindow('aacb', 'aba'));
// console.log('minWindow', minWindow('ab', 'A'));
