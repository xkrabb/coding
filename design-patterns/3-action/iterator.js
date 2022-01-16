/**
 * 迭代器
 * 集合内部实现迭代器方法，对外提供迭代器，可以遍历
 */

class TestIterator {
    constructor(coll) {
        this.collection = coll.collection;
        this.cur = -1;
    }
    current() {
        if (this.cur === -1) {
            return null;
        } else {
            this.collection[this.cur];
        }
    }
    next() {
        this.cur++;
        return this.collection[this.cur];
    }
    hasNext() {
        return Boolean(this.collection[this.cur + 1]);
    }
}

// 结合内容如何存数据对外不透明，但是必须实现迭代，提供遍历方式
class TestCollection {
    constructor() {
        this.collection = [];
        this.cur = 0;
    }
    addItem(key, value) {
        this.collection[this.cur++] = { key, value };
    }
    getIter() {
        return new TestIterator(this);
    }
}

const coll = new TestCollection();
coll.addItem('first', 1);
coll.addItem('second', 2);
coll.addItem('third', 3);
coll.addItem('four', 'value');

const iter = coll.getIter();
console.log('curr', iter.current());
while (iter.hasNext()) {
    console.log(iter.next());
}
