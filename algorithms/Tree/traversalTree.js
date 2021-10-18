function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}

const tree = new Node(1);
const node1 = (tree.left = new Node(2));
const node2 = (tree.right = new Node(3));
node1.left = new Node(4);
node1.right = new Node(5);
node2.left = new Node(6);
node2.right = new Node(7);

// BFS Breadth First Search
function walkBFS(root) {
    if (root === null) return;
    const queue = [root];
    while (queue.length > 0) {
        const item = queue.shift();
        // 取出操作节点，此处可以做更多操作
        console.log(item.value);

        item.left && queue.push(item.left);
        item.right && queue.push(item.right);
    }
}
// walkBFS(tree);

// DFS Depth First Search
function walkPreOrder(root) {
    if (root === null) {
        return;
    }
    console.log(root.value);

    root.left && walkPreOrder(root.left);
    root.right && walkPreOrder(root.right);
}

function walkPreOrder1(root) {
    if (root === null) {
        return;
    }
    const stack = [root];
    while (stack.length > 0) {
        const item = stack.pop();
        console.log(item.value);

        item.right && stack.push(item.right);
        item.left && stack.push(item.left);
    }
}

// walkPreOrder(tree);
// walkPreOrder1(tree);

function walkInOrder(root) {
    if (root === null) {
        return;
    }

    root.left && walkInOrder(root.left);
    console.log(root.value);
    root.right && walkInOrder(root.right);
}

function walkInOrder1(root) {
    if (root === null) {
        return;
    }

    const stack = [];
    let current = root;

    while (stack.length > 0 || current) {
        while (current) {
            stack.push(current);
            current = current.left;
        }
        const item = stack.pop();
        console.log(item.value);

        current = item.right;
    }
}

// walkInOrder(tree);
// walkInOrder1(tree);

function walkPostOrder(root) {
    if (root === null) {
        return;
    }

    root.left && walkPostOrder(root.left);
    root.right && walkPostOrder(root.right);
    console.log(root.value);
}

function walkPostOrder1(root) {
    if (root === null) {
        return;
    }

    // 和先序遍历相比，翻转后，还差了左右节点访问的顺序
    const stack = [root];
    const res = [];
    while (stack.length) {
        const item = stack.pop();
        // console.log(item.value);
        res.unshift(item.value);

        item.left && stack.push(item.left);
        item.right && stack.push(item.right);
    }
    return res;
}

walkPostOrder(tree);
console.log('post ', walkPostOrder1(tree));
