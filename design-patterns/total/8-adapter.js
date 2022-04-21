// 目标接口，适配者，适配器
class TargetPlugin {
    feet2() {
        console.log('两脚插头触发');
    }
}

class AdapterPlugin {
    constructor() {
        this.target = new TargetPlugin();
    }
    feet3() {
        // 类适配，继承Plugin，调用this.fee2t()
        // 对象适配，实例化对象
        console.log('feet2 三脚适配器被调用');
        this.target.feet2();
    }
}

const ad = new AdapterPlugin();
console.log('需要调用三脚的插头方法');
ad.feet3();
