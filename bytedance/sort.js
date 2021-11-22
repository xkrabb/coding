// 452.用最少数量的箭引爆气球
var findMinArrowShots = function (points) {
    if (points.length < 2) return points.length;
    points.sort((a, b) => {
        if (a[0] !== b[0]) {
            return a[0] - b[0];
        } else {
            return a[1] - b[1];
        }
    });
    let count = 1;
    // 一箭的最小右边界，如果另外一个气球左边界比这个值还打，那需要另外一箭了
    let topMin = points[0][1];
    for (let i = 1; i < points.length; i++) {
        if (points[i][0] > topMin) {
            count++;
            topMin = points[i][1];
        } else {
            topMin = Math.min(topMin, points[i][1]);
        }
    }
    return count;
};

console.log(
    'findMinArrowShots',
    findMinArrowShots([
        [9, 12],
        [1, 10],
        [4, 11],
        [8, 12],
        [3, 9],
        [6, 9],
        [6, 7]
    ])
);

// 56.合并区间【排序算法+区间问题】,区间相交则合并，类似上面
var merge = function (intervals) {
    intervals.sort((a, b) => {
        if (a[0] !== b[0]) {
            return a[0] - b[0];
        } else {
            return a[1] - b[1];
        }
    });
    let minLet = intervals[0][0]; // 左边界从小到大，不需要额外参与比较
    let maxRight = intervals[0][1];
    const res = [];
    for (let i = 1; i < intervals.length; i++) {
        const cur = intervals[i];
        if (cur[0] > maxRight) {
            res.push([minLet, maxRight]);
            minLet = cur[0];
            maxRight = cur[1];
        } else {
            maxRight = Math.max(maxRight, cur[1]);
        }
    }
    res.push([minLet, maxRight]);
    return res;
};
console.log(
    'merge',
    merge([
        [1, 3],
        [2, 6],
        [8, 10],
        [15, 18]
    ])
);
