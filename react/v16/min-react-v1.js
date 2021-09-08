// React v16 之前的架构

const TEXT_ELEMENT = 'TEXT ELEMENT';
let rootInstance = null;

function render(element, parentDom) {
    const prevInstance = rootInstance;
    const nextInstance = reconcile(parentDom, prevInstance, element);
    rootInstance = nextInstance;
}

// 增删改，替换
function reconcile(parentDom, instance, element) {
    if (instance == null) {
        const newInstance = instantiate(element);
        parentDom.appendChild(newInstance.dom);
        return newInstance;
    } else if (element == null) {
        parentDom.removeChild(instance.dom);
        return null;
    } else if (element.type !== instance.element.type) {
        const newInstance = instantiate(element);
        parentDom.replaceChild(newInstance.dom);
        return newInstance;
    } else if (typeof element.type === 'string') {
        updateDomProperties(instance.dom, instance.element.props, element.props);
        instance.childInstances = reconcileChildren(instance, element);
        instance.element = element;
        return instance;
    } else {
        // 类组件处理
        instance.publicInstance.props = element.props;
        const childElement = instance.publicInstance.render();
        const oldChildInstance = instance.childInstance;
        const childInstance = reconcile(parentDom, oldChildInstance, childElement);
        instance.dom = childInstance.dom;
        instance.childInstance = childInstance;
        instance.element = element;
        return instance;
    }
}

// 子元素处理（递归）
function reconcileChildren(instance, element) {
    const dom = instance.dom;
    const childInstances = instance.childInstances;
    const nextChildElement = element.props.children || [];
    const newChildInstances = [];
    const count = Math.max(childInstances.length, nextChildElement.length);
    for (let i = 0; i < count; i++) {
        const newChildInstance = reconcile(dom, childInstances[i], nextChildElement[i]);
        newChildInstances.push(newChildInstance);
    }
    return newChildInstances.filter((instance) => instance != null);
}

// 根据didact元素构建带dom的实例 {dom, element, childInstances}
function instantiate(element) {
    const { type, props } = element;
    const isDomElement = typeof type === 'string';

    if (isDomElement) {
        const dom = type === TEXT_ELEMENT ? document.createTextNode('') : document.createElement(type);

        updateDomProperties(dom, [], element.props);

        const childElements = props.children || [];
        const childInstances = childElements.map(instantiate);
        const childDoms = childInstances.map((childInstance) => childInstance.dom);

        childDoms.forEach((childDom) => dom.appendChild(childDom));

        return { dom, element, childInstances };
    } else {
        const instance = {};
        const publicInstance = createPublicInstance(element, instance);
        const childElement = publicInstance.render();
        const childInstance = instantiate(childElement);
        const dom = childInstance.dom;

        Object.assign(instance, { dom, element, childInstance, publicInstance });
        return instance;
    }
}

function updateDomProperties(dom, prevProps, nextProps) {
    const isEvent = (key) => key.startsWith('on');
    const isAttr = (key) => !isEvent(key) && key !== 'children';

    Object.keys(prevProps)
        .filter(isEvent)
        .forEach((key) => {
            const eventType = key.toLowerCase().substring(2);
            dom.removeEventListener(eventType, prevProps[key]);
        });

    Object.keys(prevProps)
        .filter(isAttr)
        .forEach((key) => (dom[key] = null));

    Object.keys(nextProps)
        .filter(isEvent)
        .forEach((key) => {
            const eventType = key.toLowerCase().substring(2);
            dom.addEventListener(eventType, nextProps[key]);
        });

    Object.keys(nextProps)
        .filter(isAttr)
        .forEach((key) => (dom[key] = nextProps[key]));
}

// 创建类实例
function createPublicInstance(element, internalInstance) {
    const { type, props } = element;
    const publicInstance = new type(props);
    // 当前页面实例，用于更新对比
    publicInstance.__internalInstance = internalInstance;
    return publicInstance;
}

// 类组件
class Component {
    constructor(props) {
        this.props = props;
        this.state = this.state || {};
    }
    setState(partialState) {
        this.state = { ...this.state, ...partialState };
        updateInstance(this.__internalInstance);
    }
}

// 更新
function updateInstance(internalInstance) {
    const parentDom = internalInstance.dom.parentNode;
    const element = internalInstance.element;
    reconcile(parentDom, internalInstance, element);
}

// jsx元素转didact元素
function createElement(type, config, ...args) {
    const props = { ...config };
    const children = args.length > 0 ? [...args] : [];
    props.children = children
        .filter((c) => c != null && c !== false)
        .map((c) => (c instanceof Object ? c : createTextElement(c)));

    return { type, props };
}

function createTextElement(text) {
    return createElement(TEXT_ELEMENT, { nodeValue: text });
}

const Didact = {
    render,
    createElement,
    Component
};
