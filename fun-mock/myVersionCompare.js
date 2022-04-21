// 版本号排序
const versions = ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5'];

versions.sort((v1, v2) => {
    let i = 0;
    const arr1 = v1.split('.');
    const arr2 = v2.split('.');

    while (true) {
        const a1 = arr1[i];
        const a2 = arr2[i];
        i++;
        if (a1 === a2) continue;
        if (a1 === undefined || a2 === undefined) {
            return arr1.length - arr2.length;
        }
        return a1 - a2;
    }
});

console.log('versions', versions);
