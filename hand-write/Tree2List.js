// // 打印结果：
// const res = [
//     {
//         name: '0',
//         path: 'A',
//         children: [
//             {
//                 name: '0',
//                 path: 'A-B',
//                 children: [
//                     { name: '0', path: 'A-B-C', children: [] },
//                     { name: '1', path: 'A-B-D', children: [] }
//                 ]
//             },
//             { name: '2', path: 'A-X', children: [{ name: '2', path: 'A-X-Y', children: [] }] }
//         ]
//     }
// ];

function transform(list) {
    const build = (name, path, range) => {
        let matched = false;
        let item = null;
        for (let i = 0; i < range.length; i++) {
            if (range[i].path === path) {
                item = range[i];
                matched = true;
                break;
            }
        }
        if (!matched) {
            item = { name, path, children: [] };
            range.push(item);
        }
        return item;
    };
    const res = { children: [] };
    list.forEach((item) => {
        const name = item.username;
        const departArr = item.department.split('-');
        let range = res.children;
        departArr.forEach((_, dep) => {
            const path = departArr.slice(0, dep + 1).join('-');

            range = build(name, path, range).children || [];
        });
    });
    return res.children;
}

transform([
    {
        username: '0',
        department: 'A-B-C'
    },
    {
        username: '1',
        department: 'A-B-D'
    },
    {
        username: '2',
        department: 'A-X-Y'
    }
]);
