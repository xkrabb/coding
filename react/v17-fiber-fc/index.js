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
    const isAttr = (key) => key !== 'children' && key !== 'style';
    // const isEvent = (key) => key.startsWith('on');

    Object.keys(props)
        .filter(isAttr)
        .forEach((key) => {
            dom[key] = props[key];
        });

    return dom;
}

function render(element, container) {
    nextUnitOfWork = {
        dom: container, // stateNode
        props: {
            children: [element]
        }
    };
    wipRoot = nextUnitOfWork;
}

let nextUnitOfWork = null;
let wipRoot = null;

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
    // add dom node
    // crate children new fiber
    // return next unit of work
    if (!fiber.dom) {
        fiber.dom = createDom(fiber);
    }
    if (fiber.parent) {
        fiber.parent.dom.appendChild(fiber.dom);
    }

    const elements = fiber.props.children || [];
    let index = 0;
    let prevSibling = null;
    while (index < elements.length) {
        const element = elements[index];
        const newFiber = {
            type: element.type,
            props: element.props,
            parent: fiber,
            dom: null
        };
        // 递 - 构建
        if (index === 0) {
            // !fiber.child
            fiber.child = newFiber;
        } else {
            prevSibling.sibling = newFiber;
        }
        prevSibling = newFiber;
        index++;
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

function commitRoot() {
    commitWork(wipRoot.child);
    wipRoot = null;
}

function commitWork(fiber) {
    if (!fiber) {
        return;
    }
    const domParent = fiber.parent.dom;
    domParent.appendChild(fiber.dom);
    commitWork(fiber.child);
    commitWork(fiber.sibling);
}

const Didact = {
    createElement,
    render
};
