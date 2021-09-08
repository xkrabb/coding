`Fiber React`思路

```javascript
const ENOUGH_TIME = 1; // milliseconds

let workQueue = [];
let nextUnitOfWork = null; // 全局变量, 那么一次只能走一个回调

function schedule(task) {
    // 1. 加
    workQueue.push(task); // 2. 存好了
    requestIdleCallback(performWork); // 3. 下一次空闲运行, performWork 函数
}

function performWork(deadline) {
    // 空闲机会来了
    if (!nextUnitOfWork) {
        nextUnitOfWork = workQueue.shift(); // 4. 拿出来,
    }

    // 下一回调 与 看看有没有 足够的时间 再走一趟
    while (nextUnitOfWork && deadline.timeRemaining() > ENOUGH_TIME) {
        // 5. DO something
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }

    if (nextUnitOfWork || workQueue.length > 0) {
        // 6. 如果还没有搞定, 那么 再等空闲咯
        requestIdleCallback(performWork);
    }
}
```

`Fiber` 结构

```javascript
let fiber = {
    tag: HOST_COMPONENT, // HOST_ROOT, CLASS_COMPONENT
    type: 'div',
    // 构建fiber树
    parent: parentFiber,
    child: childFiber,
    sibling: null,
    // 页面展示对应fiber
    alternate: currentFiber,
    stateNode: document.createElement('div'),
    props: { children: [], className: 'foo' },
    partialState: null,
    effectTag: PLACEMENT,
    effects: []
};
```

代码流程

![5-pic.png](https://i.loli.net/2021/09/08/SBYL29tHoXze7V1.png)

几个重要函数

`render` 和 `scheduleUpdate`

`performWork` 和 `workLoop`

`resetNextUnitOfWork`

`performUnitOfWork`

`beginWork`

`reconcileChildrenArray`

`cloneChildFibers`

`completeWork`

`commitAllWork`
