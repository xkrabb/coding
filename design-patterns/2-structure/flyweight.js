/**
 * 将对象拆分内在状态和外在状态，内在状态共享，减少内存消耗
 * 另外还有资源池就是此模式应用
 *
 */

class Flyweight {
    constructor(state) {
        this.shareState = state;
    }
    addExtends(state) {
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
    showList() {
        console.log('show all:');
        this.sourceList.forEach((item) => console.log(item.shareState, '-', item.uniqueState));
    }
    getFlyweight(state) {
        return this.sourceList.filter((item) => item.shareState === state)[0];
    }
}

const factory = new FlyweightFactory(['state1', 'state2', 'state3']);

function addState(factory, shareState, extendState) {
    const matched = factory.getFlyweight(shareState);
    matched.addExtends(extendState);
}

factory.showList();

addState(factory, 'state1', 'unique-state1');
addState(factory, 'state2', 'unique-state2');

factory.showList();
