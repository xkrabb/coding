// 版本号排序
const versions = ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5'];

versions.sort((a, b) => {
    const v1 = a.split('.');
    const v2 = b.split('.');
    let i = 0;
    while (true) {
        const cur1 = v1[i];
        const cur2 = v2[i];
        i++;
        if (!cur1 || !cur2) {
            return v1.length - v2.length;
        }
        if (cur1 === cur2) {
            continue;
        }
        if (cur1 !== cur2) {
            return cur1 - cur2;
        }
    }
});

console.log('after:', versions);
