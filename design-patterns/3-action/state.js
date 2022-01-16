/**
 * 状态模式
 * 利用状态控制行为
 * 具体工作在状体类内处理，上下文负责状态处理
 *
 */

// 交通灯负责状态切换触发行为，具体执行状态类内
class TransLight {
    constructor() {
        this.state = null;
    }
    setState(state) {
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
    tranLight() {
        console.log('当前红灯，只能转黄灯');
    }
}
class YellowState {
    constructor() {
        this.color = 'yellow';
    }
    tranLight(light) {
        console.log('当前黄灯，只能转红灯或绿灯，灯参数:', light, '转向', light === 'red' ? '红灯' : '绿灯');
    }
}
class GreenState {
    constructor() {
        this.color = 'green';
    }
    tranLight() {
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
