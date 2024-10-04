/**
 * 命令模式，将请求封装到各种命令，由命令统一处理
 *
 */

// 命令类，具备命令通用接口定义，接收命令执行接受者和参数
class MeatCommand {
    constructor(cooker) {
        this.cooker = cooker;
    }
    execute () {
        this.cooker.doMeat();
    }
    undo () { }
}

class FishCommand {
    constructor(cooker) {
        this.cooker = cooker;
    }
    execute () {
        this.cooker.doFish();
    }
    undo () { }
}

class Cooker {
    doMeat () {
        console.log('厨师烧肉');
    }
    doFish () {
        console.log('厨师做鱼');
    }
}

const cooker = new Cooker();
const meatCommand = new MeatCommand(cooker);
const fishCommand = new FishCommand(cooker);

// 可以再往上封装一层命令管理层，保存命令队列，用于撤销，重做等功能

// 直接调用，或通过命令管理调用
meatCommand.execute();
meatCommand.execute();


// 命令，具体命令，接受者，调用者
class Command {
    // 接口
    execute () { }
}

class Light {
    turnOn () {
        console.log('开灯');
    }
    turnOff () {
        console.log('关灯');
    }
}

class LightOnCommand extends Command {
    constructor(light) {
        this.light = light;
    }
    execute () {
        this.light.turnOn();
    }
}
class LightOffCommand extends Command {
    constructor(light) {
        this.light = light;
    }
    execute () {
        this.light.turnOff();
    }
}

class Invoker {
    constructor() {
        this.command = null;
    }
    setCommand (command) {
        this.command = command;
    }
    execute () {
        this.command.execute();
    }
}

const turnOnCommand = new LightOnCommand(new Light());
const turnOffCommand = new LightOffCommand(new Light());
const invoker = new Invoker();

invoker.setCommand(turnOnCommand);
invoker.execute();

invoker.setCommand(turnOffCommand);
invoker.execute();