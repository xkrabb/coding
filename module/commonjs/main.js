const o = require('./o.js');
// 多次加载只执行一次，导出模块是值拷贝

const oa = require('./a.js'); // oa 为 {}
console.log('a o.num:', o.num);
console.log('a o.obj.num:', o.obj.num);

const ob = require('./b.js'); // ob 为 {}
console.log('b o.num:', o.num);
console.log('b o.obj.num:', o.obj.num);

console.log('o.getNum:', o.getNum());
