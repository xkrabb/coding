/**
 * 每次获取的是同一个实例；
 * 饿汉，提前实例化；懒汉，获取才实例化；
 *
 */

// ========= 饿汉 ==========
class Singleton {
    constructor() {}
    static getInstance() {
        if (!this.instance) {
            this.instance = new Singleton();
        }
        return this.instance;
    }
    setName(name) {
        this.name = name;
    }
    show() {
        console.log(this.name);
    }
}

let ins1 = Singleton.getInstance();
let ins2 = Singleton.getInstance();
console.log(ins1 === ins2);

ins1.setName('wang');
ins2.show();

// ========= 懒汉 =========
function Cls() {
    const setName = (name) => {
        this.name = name;
    };
    const show = () => {
        console.log(this.name);
    };
    return { setName, show };
}

const SingletonHungry = (function () {
    this.instance = new Cls();
    const getInstance = () => {
        return this.instance;
    };

    return {
        getInstance
    };
})();

ins1 = SingletonHungry.getInstance();
ins2 = SingletonHungry.getInstance();
console.log(ins1 === ins2);
ins1.setName('cat');
ins2.show();
