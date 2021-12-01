function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}

function buildTree() {
    const root = new Node(1);
    const node1 = (root.left = new Node(2));
    const node2 = (root.right = new Node(3));
    const node3 = (node1.left = new Node(4));
    const node4 = (node1.right = new Node(5));
    node2.left = new Node(6);
    node2.right = new Node(7);
    node3.left = new Node(8);
    node3.right = new Node(9);
    return root;
}
const root = buildTree();
let result = [];

// 广度优先
function bfs(root) {
    if (!root) return;
    const queue = [root];
    while (queue.length > 0) {
        const cur = queue.shift();
        result.push(cur.value);
        cur.left && queue.push(cur.left);
        cur.right && queue.push(cur.right);
    }
}
bfs(root);
console.log('bfs:', result.join(' -> '));

// 中序遍历
result = [];
function inOrderTraversal(root) {
    if (root !== null) {
        inOrderTraversal(root.left);
        result.push(root.value);
        inOrderTraversal(root.right);
    }
}
inOrderTraversal(root);
console.log('inOrder:', result.join(' -> '));

result = [];
function inOrderIterator(root) {
    if (!root) return;
    const stack = [];
    let cur = root;
    while (stack.length > 0 || cur) {
        while (cur) {
            stack.push(cur);
            cur = cur.left;
        }
        cur = stack.pop();
        result.push(cur.value);
        cur = cur.right;
    }
}
inOrderIterator(root);
console.log('inOrder:', result.join(' -> '));

// 先序遍历
result = [];
function preOrderTraversal(root) {
    if (root !== null) {
        result.push(root.value);
        preOrderTraversal(root.left);
        preOrderTraversal(root.right);
    }
}
preOrderTraversal(root);
console.log('preOrder:', result.join(' -> '));

result = [];
function preOrderIterator(root) {
    const stack = [];
    cur = root;
    while (stack.length > 0 || cur) {
        while (cur) {
            stack.push(cur);
            result.push(cur.value);
            cur = cur.left;
        }
        cur = stack.pop();
        cur = cur.right;
    }
}
preOrderIterator(root);
console.log('preOrder:', result.join(' -> '));

result = [];
function preOrderIterator1(root) {
    const stack = [root];
    while (stack.length > 0) {
        const cur = stack.pop();
        result.push(cur.value);
        cur.right && stack.push(cur.right);
        cur.left && stack.push(cur.left);
    }
}
preOrderIterator1(root);
console.log('preOrder:', result.join(' -> '));

// 后序遍历
result = [];
function postOrderTraversal(root) {
    if (root !== null) {
        postOrderTraversal(root.left);
        postOrderTraversal(root.right);
        result.push(root.value);
    }
}
postOrderTraversal(root);
console.log('postOrder:', result.join(' -> '));

result = [];
function postOrderIterator(root) {
    const stack = [];
    let pre = null; // pre指向上次访问过的值：左-右-中 （中访问的上一次是右，就不会重复进入右子树）
    let cur = root;
    while (stack.length > 0 || cur) {
        while (cur) {
            stack.push(cur);
            cur = cur.left;
        }
        cur = stack[stack.length - 1];
        if (cur.right && pre !== cur.right) {
            cur = cur.right;
        } else {
            cur = stack.pop();
            result.push(cur.value);
            pre = cur;
            cur = null;
        }
    }
}
postOrderIterator(root);
console.log('postOrder:', result.join(' -> '));

result = [];
function postOrderIterator1(root) {
    const stack = [root];
    // 先序：中-左-右； 后序：左-右-中。适用取值，不适用执行顺序
    while (stack.length > 0) {
        const cur = stack.pop();
        result.unshift(cur.value);
        cur.left && stack.push(cur.left);
        cur.right && stack.push(cur.right);
    }
}
postOrderIterator1(root);
console.log('postOrder:', result.join(' -> '));
