// [[1,2,3,[4,5,[6]]], 7] => [1,2,3,4,5,6,7]

function flattenArr(arr) {
    return arr.reduce((res, cur) => {
        if (Array.isArray(cur)) {
            return [...res, ...flattenArr(cur)];
        }
        return [...res, cur];
    }, []);
}

const arr = [1, 2, [3, 4, 5, [6, 7, 8]], [9, 10]];

console.log(flattenArr(arr));
