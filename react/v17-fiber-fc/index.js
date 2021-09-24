// jsx元素转didact元素
function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map((item) => {
                return typeof item === 'object' ? item : createTextElement(item);
            })
        }
    };
}

// 纯文本节点转didact元素
function createTextElement(text) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: []
        }
    };
}

// 创建dom
function createDom(fiber) {
    const { type, props } = fiber;
    const dom = type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(type);
    updateDom(dom, {}, props);
    return dom;
}

const isEvent = (key) => key.startsWith('on');
const isAttr = (key) => key !== 'children' && key !== 'style' && !isEvent(key);
const isNew = (prev, next) => (key) => prev[key] !== next[key];
const isGone = (prev, next) => (key) => !(key in next);
// 只更新属性
function updateDom(dom, prevProps, nextProps) {
    Object.keys(prevProps)
        .filter(isEvent)
        .filter((key) => isGone(prevProps, nextProps)(key) || isNew(prevProps, nextProps)(key))
        .forEach((key) => {
            const eventType = key.toLowerCase().substring(2);
            dom.removeEventListener(eventType, prevProps[key]);
        });

    Object.keys(prevProps)
        .filter(isAttr)
        .filter(isGone(prevProps, nextProps))
        .forEach((key) => (dom[key] = ''));

    Object.keys(nextProps)
        .filter(isAttr)
        .filter(isNew(prevProps, nextProps))
        .forEach((key) => (dom[key] = nextProps[key]));

    Object.keys(nextProps)
        .filter(isEvent)
        .filter(isNew(prevProps, nextProps))
        .forEach((key) => {
            const eventType = key.toLowerCase().substring(2);
            dom.addEventListener(eventType, nextProps[key]);
        });
}

function render(element, container) {
    nextUnitOfWork = {
        dom: container, // stateNode
        props: {
            children: [element]
        },
        alternate: currentRoot
    };
    deletions = [];
    wipRoot = nextUnitOfWork;
}

let nextUnitOfWork = null; // 递归构建的当前fiber
let wipRoot = null; // commit前root fiber
let currentRoot = null; // 当前页面root fiber
let deletions = null; // 待删除 fibers

function workLoop(deadline) {
    let shouldYield = false;
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        shouldYield = deadline.timeRemaining() < 1;
    }

    if (!nextUnitOfWork && wipRoot) {
        commitRoot();
    }

    // 下次空闲执行
    requestIdleCallback(workLoop);
}

// 空闲时候启动
requestIdleCallback(workLoop);

function performUnitOfWork(fiber) {
    const isFunctionComponent = fiber.type instanceof Function;

    if (isFunctionComponent) {
        updateFunctionComponent(fiber);
    } else {
        updateHostComponent(fiber);
    }

    // 归 - 返回
    if (fiber.child) {
        return fiber.child;
    }
    let nextFiber = fiber;
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling;
        }
        nextFiber = nextFiber.parent;
    }
}

let wipFiber = null;
let hookIndex = null;

function updateFunctionComponent(fiber) {
    wipFiber = fiber;
    hookIndex = 0;
    wipFiber.hooks = [];
    // 单节点
    const children = [fiber.type(fiber.props)];
    reconcileChildren(fiber, children);
}

function useState(initial) {
    const oldHook = wipFiber.alternate && wipFiber.alternate.hooks && wipFiber.alternate.hooks[hookIndex];
    const hook = {
        state: oldHook ? oldHook.state : initial,
        queue: []
    };

    const actions = oldHook ? oldHook.queue : [];
    actions.forEach((action) => {
        hook.state = action(hook.state);
    });

    const setState = (action) => {
        hook.queue.push(action);
        wipRoot = {
            dom: currentRoot.dom,
            props: currentRoot.props,
            alternate: currentRoot
        };
        nextUnitOfWork = wipRoot;
        deletions = [];
    };

    wipFiber.hooks.push(hook);
    hookIndex++;

    return [hook.state, setState];
}

function updateHostComponent(fiber) {
    if (!fiber.dom) {
        fiber.dom = createDom(fiber);
    }

    const elements = fiber.props.children || [];
    reconcileChildren(fiber, elements);
}

// 子元素处理
function reconcileChildren(wipFiber, elements) {
    let index = 0;
    let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
    let prevSibling = null;

    while (index < elements.length || oldFiber != null) {
        const element = elements[index];
        let newFiber = null;
        const sameType = element && oldFiber && element.type === oldFiber.type;

        if (sameType) {
            newFiber = {
                type: oldFiber.type,
                props: element.props,
                dom: oldFiber.dom,
                parent: wipFiber,
                alternate: oldFiber,
                effectTag: 'UPDATE'
            };
        } else if (element && !sameType) {
            newFiber = {
                type: element.type,
                props: element.props,
                dom: null,
                parent: wipFiber,
                alternate: null,
                effectTag: 'PLACEMENT'
            };
        } else if (oldFiber && !sameType) {
            oldFiber.effectTag = 'DELETION';
            deletions.push(oldFiber);
        }

        if (oldFiber) {
            oldFiber = oldFiber.sibling;
        }

        // 递 - 构建
        if (index === 0) {
            // !fiber.child
            wipFiber.child = newFiber;
        } else {
            prevSibling.sibling = newFiber;
        }
        prevSibling = newFiber;
        index++;
    }
}

function commitRoot() {
    deletions.forEach(commitWork);
    commitWork(wipRoot.child);
    currentRoot = wipRoot; // 挂载完成后，保存当前页面root fiber
    wipRoot = null;
}

function commitWork(fiber) {
    if (!fiber) {
        return;
    }

    let parentFiber = fiber.parent;
    while (!parentFiber.dom) {
        parentFiber = parentFiber.parent;
    }
    const domParent = parentFiber.dom;

    if (fiber.effectTag === 'PLACEMENT' && fiber.dom != null) {
        domParent.appendChild(fiber.dom);
    } else if (fiber.effectTag === 'UPDATE' && fiber.dom != null) {
        updateDom(fiber.dom, fiber.alternate.props, fiber.props);
    } else if (fiber.effectTag === 'DELETION') {
        commitDeletion(fiber, domParent);
    }

    commitWork(fiber.child);
    commitWork(fiber.sibling);
}

function commitDeletion(fiber, parentDom) {
    if (fiber.dom) {
        parentDom.removeChildren(fiber.dom);
    } else {
        commitDeletion(fiber.child, parentDom);
    }
}

const Didact = {
    createElement,
    render,
    useState
};
