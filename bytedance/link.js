function NodeList(val) {
    this.val = val;
    this.next = null;
}

const head = new NodeList(1);
head.next = new NodeList(2);

// 206.反转链表
var reverseList = function (head) {
    let pre = null;
    let cur = head;
    while (cur !== null) {
        const next = cur.next;
        cur.next = pre;

        pre = cur;
        cur = next;
    }
    return pre;
};

// 234.前序遍历判断回文链表：翻转后比较或后半段翻转比较（比较完翻转回去）
var isPalindrome = function (head) {
    if (head === null || head.next === null) return true;
    let slow = head;
    let fast = head;
    while (fast.next !== null && fast.next.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    //
    const half = reverseList(slow.next);
    let end = half;
    let start = head;
    while (end !== null) {
        if (end.val !== start.val) {
            return false;
        }
        start = start.next;
        end = end.next;
    }
    slow.next = reverseList(half);
    return true;
};

console.log('isPalindrome', isPalindrome(head));

const mergeTwo = (root1, root2) => {
    let head = new NodeList(0);
    let pre = head;
    while (root1 && root2) {
        if (root1.val < root2.val) {
            pre.next = root1;
            root1 = root1.next;
        } else {
            pre.next = root2;
            root2 = root2.next;
        }
        pre = pre.next;
    }
    if (root1) {
        pre.next = root1;
    }
    if (root2) {
        pre.next = root2;
    }
    return head;
};
// 23.合并K个升序链表
var mergeKLists = function (lists) {
    if (lists.length === 0) return null;
    let pre = lists[0];
    for (let i = 1; i < lists.length; i++) {
        pre = mergeTwo(pre, list[i]);
    }
    return pre;
};

const reverseListWithTail = (head, tail) => {
    let pre = null;
    let cur = head;
    while (pre !== tail) {
        const next = cur.next;
        cur.next = pre;

        pre = cur;
        cur = next;
    }
    return [cur, head];
};
// 25.K个一组翻转链表
var reverseKGroup = function (head, k) {
    let pre = head;
    let after = head;
    let count = 1;
    while (after) {
        after = after.next;
        count += 1;
        if (count === k) {
            reverseList(pre);
            pre = after;
        }
    }
};

const reNode = new NodeList(1);
const n1 = (reNode.next = new NodeList(2));
const n2 = (n1.next = new NodeList(3));
const n3 = (n2.next = new NodeList(4));
const n4 = (n3.next = new NodeList(5));
const n5 = (n4.next = new NodeList(6));
let [head1] = reverseListWithTail(reNode, n4);
while (head1) {
    console.log('=> ', head1.val);
    head1 = head1.next;
}

// 141.环形链表：快慢指针

// 148.排序链表：归并

// 160.相交链表
