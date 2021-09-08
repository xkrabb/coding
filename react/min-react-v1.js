/**
 * Didact元素，jsx元素转换结果，
const element = {
    type: 'div',
    props: {
        id: 'container',
        children: [
            { type: 'input', props: { value: 'foo', type: 'text' } },
            { type: 'a', props: { href: '/bar' } },
            { type: 'span', props: {} }
        ]
    }
};
 * 
 */

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
    } else if (element.type === instance.element.type) {
        updateDomProperties(instance.dom, instance.element.props, element.props);
        instance.childInstances = reconcileChildren(instance, element);
        instance.element = element;
        return instance;
    } else {
        const newInstance = instantiate(element);
        parentDom.replaceChild(newInstance.dom);
        return newInstance;
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
    const dom = type === TEXT_ELEMENT ? document.createTextNode('') : document.createElement(type);

    updateDomProperties(dom, [], element.props);

    const childElements = props.children || [];
    const childInstances = childElements.map(instantiate);
    const childDoms = childInstances.map((childInstance) => childInstance.dom);
    childDoms.forEach((childDom) => dom.appendChild(childDom));

    return { dom, element, childInstances };
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
    createElement
};
