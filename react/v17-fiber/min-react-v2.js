// Fiber tags
const HOST_COMPONENT = 'host';
const CLASS_COMPONENT = 'class';
const HOST_ROOT = 'root';

// 设置剩余可执行时间 milliseconds
const ENOUGH_TIME = 1;

// Global state
const updateQueue = [];
let nextUnitOfWork = null;
let pendingCommit = null;

function render(elements, containerDom) {
    updateQueue.push({
        from: HOST_ROOT,
        dom: containerDom,
        newProps: { children: elements }
    });
    // 下一个浏览器空闲时
    requestIdleCallback(performWork);
}

// 提供setState使用
function scheduleUpdate(instance, partialState) {
    updateQueue.push({
        from: CLASS_COMPONENT,
        instance: instance,
        partialState: partialState
    });
    requestIdleCallback(performWork);
}

function performWork(deadline) {
    workLoop(deadline);
    // 是否有待更新
    if (nextUnitOfWork || updateQueue.length > 0) {
        requestIdleCallback(performWork);
    }
}

function workLoop(deadline) {
    if (!nextUnitOfWork) {
        // 从队列取到nextUnitOfWork
        resetNextUnitOfWork();
    }
    while (nextUnitOfWork && deadline.timeRemaining() > ENOUGH_TIME) {
        // 关注时间 是否足够 运行另一个工作单元
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }
    if (pendingCommit) {
        commitAllWork(pendingCommit);
    }
}

function resetNextUnitOfWork() {
    const update = updateQueue.shift();
    if (!update) {
        return;
    }

    // setState会设置partialState
    if (update.partialState) {
        update.instance.__fiber.partialState = update.partialState;
    }

    const root = update.from == HOST_ROOT ? update.dom._rootContainerFiber : getRoot(update.instance.__fiber);

    nextUnitOfWork = {
        tag: HOST_ROOT,
        stateNode: update.dom || root.stateNode,
        props: update.newProps || root.props,
        alternate: root
    };
}

function getRoot(fiber) {
    let node = fiber;
    while (node.parent) {
        node = node.parent;
    }
    return node;
}

// 归阶段顺序： 子 -> 兄弟 -> 父
function performUnitOfWork(wipFiber) {
    // 往下构建fiber树
    beginWork(wipFiber);
    if (wipFiber.child) {
        return wipFiber.child;
    }

    let uow = wipFiber;
    while (uow) {
        // 往上遍历取
        completeWork(uow);
        if (uow.sibling) {
            return uow.sibling;
        }
        uow = uow.parent;
    }
}

function beginWork(wipFiber) {
    if (wipFiber.tag == CLASS_COMPONENT) {
        updateClassComponent(wipFiber);
    } else {
        updateHostComponent(wipFiber);
    }
}

function updateHostComponent(wipFiber) {
    if (!wipFiber.stateNode) {
        wipFiber.stateNode = createDomElement(wipFiber);
    }
    const newChildElements = wipFiber.props.children;
    reconcileChildrenArray(wipFiber, newChildElements);
}

function updateClassComponent(wipFiber) {
    let instance = wipFiber.stateNode;
    if (instance == null) {
        // 调用类初始化
        instance = wipFiber.stateNode = createInstance(wipFiber);
    } else if (wipFiber.props == instance.props && !wipFiber.partialState) {
        // 不需要更新,最后 复制 孩子
        cloneChildFibers(wipFiber);
        return;
    }

    instance.props = wipFiber.props;
    instance.state = Object.assign({}, instance.state, wipFiber.partialState);
    wipFiber.partialState = null;

    const newChildElements = wipFiber.stateNode.render();
    reconcileChildrenArray(wipFiber, newChildElements);
}

// Effect tags
const PLACEMENT = 1;
const DELETION = 2;
const UPDATE = 3;

function arrify(val) {
    return val == null ? [] : Array.isArray(val) ? val : [val];
}

function reconcileChildrenArray(wipFiber, newChildElements) {
    const elements = arrify(newChildElements);

    let index = 0;
    let oldFiber = wipFiber.alternate ? wipFiber.alternate.child : null;
    let newFiber = null;
    while (index < elements.length || oldFiber != null) {
        const prevFiber = newFiber;
        const element = index < elements.length && elements[index];
        const sameType = oldFiber && element && element.type == oldFiber.type;

        if (sameType) {
            newFiber = {
                type: oldFiber.type,
                tag: oldFiber.tag,
                stateNode: oldFiber.stateNode,
                props: element.props,
                parent: wipFiber,
                alternate: oldFiber,
                partialState: oldFiber.partialState,
                effectTag: UPDATE
            };
        }

        if (element && !sameType) {
            newFiber = {
                type: element.type,
                tag: typeof element.type === 'string' ? HOST_COMPONENT : CLASS_COMPONENT,
                props: element.props,
                parent: wipFiber,
                effectTag: PLACEMENT
            };
        }

        if (oldFiber && !sameType) {
            oldFiber.effectTag = DELETION;
            wipFiber.effects = wipFiber.effects || [];
            wipFiber.effects.push(oldFiber);
        }

        if (oldFiber) {
            oldFiber = oldFiber.sibling;
        }

        if (index == 0) {
            wipFiber.child = newFiber;
        } else if (prevFiber && element) {
            prevFiber.sibling = newFiber;
        }

        index++;
    }
}

function cloneChildFibers(parentFiber) {
    const oldFiber = parentFiber.alternate;
    if (!oldFiber.child) {
        return;
    }

    let oldChild = oldFiber.child;
    let prevChild = null;
    while (oldChild) {
        const newChild = {
            type: oldChild.type,
            tag: oldChild.tag,
            stateNode: oldChild.stateNode,
            props: oldChild.props,
            partialState: oldChild.partialState,
            alternate: oldChild,
            parent: parentFiber
        };
        if (prevChild) {
            prevChild.sibling = newChild;
        } else {
            parentFiber.child = newChild;
        }
        prevChild = newChild;
        oldChild = oldChild.sibling;
    }
}

function completeWork(fiber) {
    if (fiber.tag == CLASS_COMPONENT) {
        fiber.stateNode.__fiber = fiber;
    }

    if (fiber.parent) {
        const childEffects = fiber.effects || [];
        const thisEffect = fiber.effectTag != null ? [fiber] : [];
        const parentEffects = fiber.parent.effects || [];
        fiber.parent.effects = parentEffects.concat(childEffects, thisEffect);
    } else {
        pendingCommit = fiber;
    }
}

function commitAllWork(fiber) {
    fiber.effects.forEach((f) => {
        commitWork(f);
    });
    fiber.stateNode._rootContainerFiber = fiber;
    nextUnitOfWork = null; // Reset
    pendingCommit = null;
}

function commitWork(fiber) {
    if (fiber.tag == HOST_ROOT) {
        return;
    }

    let domParentFiber = fiber.parent;
    while (domParentFiber.tag == CLASS_COMPONENT) {
        domParentFiber = domParentFiber.parent;
    }
    const domParent = domParentFiber.stateNode;

    if (fiber.effectTag == PLACEMENT && fiber.tag == HOST_COMPONENT) {
        domParent.appendChild(fiber.stateNode); // add
    } else if (fiber.effectTag == UPDATE) {
        updateDomProperties(fiber.stateNode, fiber.alternate.props, fiber.props);
    } else if (fiber.effectTag == DELETION) {
        commitDeletion(fiber, domParent);
    }
}

function commitDeletion(fiber, domParent) {
    let node = fiber;
    while (true) {
        if (node.tag == CLASS_COMPONENT) {
            node = node.child;
            continue;
        }
        domParent.removeChild(node.stateNode);
        while (node != fiber && !node.sibling) {
            node = node.parent;
        }
        if (node == fiber) {
            return;
        }
        node = node.sibling;
    }
}

const Didact = {
    createElement,
    render,
    Component
};
