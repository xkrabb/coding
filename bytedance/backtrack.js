// 回溯可以算是一种dfs，多了做选择和回退选择

// 51.N皇后，第一个依次遍历一行，剩下的递归判断，所有行都校验过，重置标记：行（遍历），列()，对角线（row-col固定，col+row固定）
var solveNQueens = function (n) {
    const result = [];
    const columns = new Set();
    const diagonal1 = new Set();
    const diagonal2 = new Set();
    backtrack;
};

function backtrack() {}

function generateRes() {}

// 46.全排列

// 22.括号生成

// 93.复原 IP 地址

// 78.子集
