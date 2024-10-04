/**
 * 将对象拆分内在状态和外在状态，内在状态共享，减少内存消耗
 * 另外还有资源池就是此模式应用
 *
 * 需要区分公共状态和独立状态
 * 
 * 享元模式的核心是享元工厂类，享元工厂类的作用在于提供一个用于存储享元对象的享元池，
 * 用户需要对象时，首先从享元池中获取，如果享元池中不存在，则创建一个新的享元对象返回给用户，并在享元池中保存该新增对象。
 * 
 */

class Flyweight {
    constructor(state) {
        this.shareState = state;
    }
    addExtends (state) {
        this.uniqueState = state;
        console.log('shareState:', this.shareState, ' add uniqueState:', this.uniqueState);
    }
}

class FlyweightFactory {
    constructor(list) {
        // 共享资源
        this.sourceList = list.map((item) => {
            return new Flyweight(item);
        });
    }
    showList () {
        console.log('show all:');
        this.sourceList.forEach((item) => console.log(item.shareState, '-', item.uniqueState));
    }
    getFlyweight (state) {
        return this.sourceList.filter((item) => item.shareState === state)[0];
    }
}

const factory = new FlyweightFactory(['state1', 'state2', 'state3']);

function addState (factory, shareState, extendState) {
    const matched = factory.getFlyweight(shareState);
    matched.addExtends(extendState);
}

factory.showList();

addState(factory, 'state1', 'unique-state1');
addState(factory, 'state2', 'unique-state2');

factory.showList();
