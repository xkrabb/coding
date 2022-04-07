class Singleton {
    constructor() {
        console.log('实例化');
        this.count = 1;
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new Singleton();
        }
        return this.instance;
    }
    show() {
        console.log('current count ', this.count);
        this.count++;
    }
}

const ins = Singleton.getInstance();
ins.show();
const ins2 = Singleton.getInstance();
ins2.show();
