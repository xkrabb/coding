class LRUCache {
    constructor(size) {
        this.stack = new Map();
        this.size = size;
    }
    get(key) {
        if (this.stack.has(key)) {
            const val = this.stack.get(key);
            this.stack.delete(key);
            this.stack.set(key, val);
            return val;
        }
        return -1;
    }
    put(key, value) {
        if (this.stack.has(key)) {
            this.stack.delete(key);
            this.stack.set(key, value);
        } else if (this.stack.size < this.size) {
            this.stack.set(key, value);
        } else {
            const topKey = this.stack.keys().next().value;
            this.stack.delete(topKey);
            this.stack.set(key, value);
        }
    }
}

let cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log('cache.get(1)', cache.get(1)); // 返回  1
cache.put(3, 3); // 该操作会使得密钥 2 作废
console.log('cache.get(2)', cache.get(2)); // 返回 -1 (未找到)
cache.put(4, 4); // 该操作会使得密钥 1 作废
console.log('cache.get(1)', cache.get(1)); // 返回 -1 (未找到)
console.log('cache.get(3)', cache.get(3)); // 返回  3
console.log('cache.get(4)', cache.get(4)); // 返回  4
