// 155. 最小栈【栈】

var MinStack = function () {
    this.stack = [];
    this.min_stack = [];
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
    this.stack.push(val);
    const lastIdx = this.min_stack.length - 1;
    console.log('min', Math.min(val, this.min_stack[lastIdx]));
    this.min_stack.push(
        Math.min(val, typeof this.min_stack[lastIdx] === 'number' ? this.min_stack[lastIdx] : Infinity)
    );
    console.log('push', this.min_stack);
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
    this.stack.pop();
    this.min_stack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
    console.log(this.stack);
    return this.stack[this.stack.length - 1] || null;
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
    console.log(this.min_stack);
    return this.min_stack[this.min_stack.length - 1] || null;
};
const s = new MinStack();
console.log(s.push(0), s.push(1), s.push(0), s.getMin(), s.pop(), s.getMin());

// 496.下一个更大元素，倒序遍历，构建nums2下一个最大值map；循环数组（拼接一次，对长度取模也可）
var nextGreaterElement = function (nums1, nums2) {
    const map = {};
    const stack = [];
    for (let i = 0; i < nums2.length; i++) {
        while (stack.length && nums2[stack[stack.length - 1]] < nums2[i]) {
            map[nums2[stack[stack.length - 1]]] = nums2[i];
            stack.pop();
        }
        stack.push(i);
    }

    return nums1.reduce((res, cur) => {
        res.push(map[cur] || -1);
        return res;
    }, []);
};

var nextGreaterElements = function (nums) {
    // 循环数据，2倍长度，对长度取模，模拟拼接
    const stk = [];
    const res = new Array(nums.length).fill(-1);
    const len = nums.length;
    for (let i = 0; i < 2 * len - 1; i++) {
        while (stk.length && nums[stk[stk.length - 1]] < nums[i % len]) {
            res[stk[stk.length - 1]] = nums[i % len];
            stk.pop();
        }
        stk.push(i % len);
    }
    return res;
};

console.log('nextGreaterElement', nextGreaterElement([4, 1, 2], [1, 3, 4, 2]));
console.log('nextGreaterElements', nextGreaterElements([1, 3, 4, 2]));

// 20.【面试真题】有效的括号
var isValid = function (s) {
    const stack = [];
    const quoteMap = {
        ')': '(',
        ']': '[',
        '}': '{'
    };
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        if (!quoteMap[char]) {
            stack.push(char);
        } else if (quoteMap[char] === stack.slice(-1)[0]) {
            stack.pop();
        } else {
            return false;
        }
    }
    return stack.length === 0;
};

console.log('isValid', isValid('([)]'));

// 71.简化路径
var simplifyPath = function (path) {
    const pathArr = path.split('/');
    const stack = [];
    for (let i = 0; i < pathArr.length; i++) {
        const cur = pathArr[i];
        if (cur === '..') {
            stack.pop();
        } else if (['.', ''].includes(cur)) {
        } else {
            stack.push(cur);
        }
    }
    return `/${stack.join('/')}`;
};
