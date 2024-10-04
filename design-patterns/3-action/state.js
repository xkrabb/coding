/**
 * 状态模式
 * 利用状态控制行为
 * 具体工作在状体类内处理，上下文负责状态处理
 *
 * 
 * 场景：草稿/审核/发布/撤销(审批流)
 */

// 交通灯负责状态切换触发行为，具体执行状态类内
class TransLight {
    constructor() {
        this.state = null;
    }
    setState (state) {
        this.state = state;
        if (this.state.color === 'green' || this.state.color === 'red') {
            this.state.tranLight();
        }
        if (this.state.color === 'yellow') {
            this.state.tranLight('red');
        }
        if (this.state.color === 'yellow') {
            this.state.tranLight('green');
        }
    }
}

class RedState {
    constructor() {
        this.color = 'red';
    }
    tranLight () {
        console.log('当前红灯，只能转黄灯');
    }
}
class YellowState {
    constructor() {
        this.color = 'yellow';
    }
    tranLight (light) {
        console.log('当前黄灯，只能转红灯或绿灯，灯参数:', light, '转向', light === 'red' ? '红灯' : '绿灯');
    }
}
class GreenState {
    constructor() {
        this.color = 'green';
    }
    tranLight () {
        console.log('当前绿灯，只能转黄灯');
    }
}

const lightControl = new TransLight();
const red = new RedState();
const yellow = new YellowState();
const green = new GreenState();

lightControl.setState(red);
lightControl.setState(yellow);
lightControl.setState(green);


// 上下文，状态，具体状态。 上下文持有状态引用，更改状态方法
// 形式很像策略模式，但是策略模式不能更改上下文的使用策略

class State {
    singleLightWork () { }
}

class RedLight extends State {
    constructor(context) {
        this.context = context;
    }
    singleLightWork () {
        console.log('红灯亮');
        setTimeout(() => {
            this.context.setState(this.context.yellowLight);
        }, 1000);
    }
}

class YellowLight extends State {
    constructor(context) {
        this.context = context;
    }
    singleLightWork () {
        console.log('黄灯亮');
        setTimeout(() => {
            if (this.context.state === this.context.redLight) {
                this.context.setState(this.context.greenLight);
            } else {
                this.context.setState(this.context.redLight);
            }
        }, 1000);
    }
}

class GreenLight extends State {
    constructor(context) {
        this.context = context;
    }
    singleLightWork () {
        console.log('绿灯亮');
        setTimeout(() => {
            this.context.setState(this.context.yellowLight);
        }, 1000);
    }
}

class Context {
    constructor() {
        this.state = null;
        this.redLight = new RedLight(this);
        this.yellowLight = new YellowLight(this);
        this.greenLight = new GreenLight(this);
        this.setState(this.redLight);
    }
    setState (state) {
        this.state = state;
        this.state.singleLightWork();
    }
}