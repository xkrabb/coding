const list = [
    {
        id: 1,
        text: '节点1',
        parentId: 0 //这里用0表示为顶级节点
    },
    {
        id: 2,
        text: '节点1_1',
        parentId: 1 //通过这个字段来确定子父级
    },
    {
        id: 3,
        text: '节点1_1',
        parentId: 2 //通过这个字段来确定子父级
    }
];
// tree to list

const list2Tree = (list) => {
    if (list.length === 0) return [];
    const res = [];
    const map = {};
    list.forEach((item) => {
        map[item.id] = item;
    });
    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        if (item.parentId === 0) {
            res.push(item);
        } else {
            if (!map[item.parentId].children) {
                map[item.parentId].children = [];
            }
            map[item.parentId].children.push(item);
        }
    }

    return res;
};

const res = list2Tree(list);
console.log('res', JSON.stringify(res));

const tree = [
    {
        id: 1,
        text: '节点1',
        parentId: 0,
        children: [
            {
                id: 2,
                text: '节点1_1',
                parentId: 1
            }
        ]
    }
];
// list to tree
const tree2List = (tree) => {
    const res = [];
    const dfs = (tree) => {
        tree.forEach((item) => {
            if (item.children) {
                dfs(item.children);
                delete item.children;
            }
            res.push(item);
        });
    };
    dfs(tree);
    return res;
};

console.log('tree2List', tree2List(res));
