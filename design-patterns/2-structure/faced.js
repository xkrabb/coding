/**
 * 一个系统会调用很多子类，导致调用关系复杂。将所有子类往上提取一个外观类，统一管理子类。
 * 业务与子类解耦
 *
 */

class Sub1 {
    constructor() { }
    control1 () {
        console.log('sub 1 - control 1');
    }
}

class Sub2 {
    constructor() { }
    control1 () {
        console.log('sub 2 - control 2');
    }
}

class Sub3 {
    constructor() { }
    control3 () {
        console.log('sub 3 - control 3');
    }
}

class Sub4 {
    constructor() { }
    control4 () {
        console.log('sub 4 - control 4');
    }
}

class Faced {
    constructor() { }
    con1 () {
        new Sub1().control1();
    }
    con2 () {
        new Sub2().control2();
    }
    con3 () {
        new Sub3().control3();
    }
    con4 () {
        new Sub4().control4();
    }
}

// 避免业务代码直接调用Sub类
const faced = new Faced();
faced.con1();
faced.con3();


// 针对子系统，通过外面对象控制，而不用针对每个子系统操作
// ===== 外观模式 ====
class Tv {
    constructor() { }
    on () {
        console.log('tv on');
    }
    off () {
        console.log('tv off');
    }
}

class Sound {
    constructor() { }
    on () {
        console.log('sound on');
    }
    off () {
        console.log('sound off');
    }
}

class Facade {
    constructor() {
        this.tv = new Tv();
        this.sound = new Sound();
    }
    on () {
        this.tv.on();
        this.sound.on();
    }
    off () {
        this.tv.off();
        this.sound.off();
    }
}