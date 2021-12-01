function Node(val) {
    this.value = val;
    this.next = null;
}

const node1 = new Node(1);
const node2 = new Node(2);
const node3 = new Node(3);
const node4 = new Node(4);
node1.next = node2;
node2.next = node3;
node3.next = node4;

function traversalList(head) {
    const res = [];
    let cur = head;
    while (cur) {
        res.push(cur.value);
        cur = cur.next;
    }
    console.log('res: ', res);
}

traversalList(node1);

// 递归，dp
const reverseList = (head) => {
    if (head === null || head.next === null) {
        return head;
    }

    const newList = reverseList(head.next);
    const tmp = head.next;
    tmp.next = head;
    head.next = null;

    return newList;
};

// traversalList(reverseList(node1));

const reverseList1 = (head) => {
    if (head === null || head.next === null) {
        return head;
    }
    let cur = head;
    while (cur.next) {
        const tmp = cur.next;
        cur.next.next = cur;

        cur.next = null;
        cur = tmp;
    }
    return cur;
};

traversalList(reverseList(node1));
// 动态规划优化思路
