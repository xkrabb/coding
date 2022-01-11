/**
 * 一个系统会调用很多子类，导致调用关系复杂。将所有子类往上提取一个外观类，统一管理子类。
 * 业务与子类解耦
 *
 */

class Sub1 {
    constructor() {}
    control1() {
        console.log('sub 1 - control 1');
    }
}

class Sub2 {
    constructor() {}
    control1() {
        console.log('sub 2 - control 2');
    }
}

class Sub3 {
    constructor() {}
    control3() {
        console.log('sub 3 - control 3');
    }
}

class Sub4 {
    constructor() {}
    control4() {
        console.log('sub 4 - control 4');
    }
}

class Faced {
    constructor() {}
    con1() {
        new Sub1().control1();
    }
    con2() {
        new Sub2().control2();
    }
    con3() {
        new Sub3().control3();
    }
    con4() {
        new Sub4().control4();
    }
}

// 避免业务代码直接调用Sub类
const faced = new Faced();
faced.con1();
faced.con3();
