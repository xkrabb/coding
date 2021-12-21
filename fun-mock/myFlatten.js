// 参数是数组校验未处理。。。
function myFlatten(arr) {
    return arr.reduce((res, cur) => {
        return res.concat(...(Array.isArray(cur) ? myFlatten(cur) : [cur]));
    }, []);
}

const arr = [1, 2, [3, 4, 5, [6, 7, 8]], [9, 10]];

console.log(myFlatten(arr));
