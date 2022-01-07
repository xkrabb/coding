// 235.二叉树的最近公共祖先
var lowestCommonAncestor = function (root, p, q) {
    let ancestor = root;
    while (ancestor) {
        if (ancestor.val < p.val && ancestor.val < q.val) {
            ancestor = ancestor.right;
        } else if (ancestor.val > p.val && ancestor.val > q.val) {
            ancestor = ancestor.left;
        } else {
            return ancestor;
        }
    }
    return null;
};

// 700.二叉搜索树中的搜索

// 450.删除二叉搜索树中的节点

// 222.完全二叉树的节点个数

// 103.二叉树的锯齿形层序遍历

// ----- BFS -----

// 752.打开转盘锁

// 104.二叉树的最小深度

// ----- DFS -----

// 695.岛屿的最大面积

// 100.相同的树
