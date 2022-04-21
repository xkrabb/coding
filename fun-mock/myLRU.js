class LRUCache {
    constructor(size) {
        this.size = size;
        // 前提是map返回的keys是和set同序的
        this.map = new Map();
    }
    put(key, value) {
        if (this.map.has(key)) {
            this.map.delete(key);
            this.map.set(key, value);
        } else if (this.map.size < this.size) {
            this.map.set(key, value);
        } else {
            this.map.delete(this.map.keys().next().value);
            this.map.set(key, value);
        }
    }
    get(key) {
        if (this.map.has(key)) {
            const val = this.map.get(key);
            this.map.delete(key);
            this.map.set(key, val);
            return val;
        }
        return -1;
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
