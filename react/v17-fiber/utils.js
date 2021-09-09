const isEvent = (key) => key.startsWith('on');
const isAttr = (key) => !isEvent(key) && !['children', 'style'].includes(key);
const isNew = (prev, next) => (key) => prev[key] !== next[key];
const isGone = (prev, next) => (key) => !(key in next);

// 更新属性：事件，样式，属性
function updateDomProperties(dom, prevProps, nextProps) {
    Object.keys(prevProps)
        .filter(isEvent)
        .filter((key) => isGone(prevProps, nextProps)(key) || isNew(prevProps, nextProps)(key))
        .forEach((name) => {
            const eventType = name.substring(2);
            dom.removeEventListener(eventType, prevProps[name]);
        });

    Object.keys(nextProps)
        .filter(isEvent)
        .filter(isNew(prevProps, nextProps))
        .forEach((name) => {
            const eventType = name.toLowerCase().substring(2);
            dom.addEventListener(eventType, nextProps[name]);
        });

    Object.keys(prevProps)
        .filter(isAttr)
        .filter(isGone(prevProps, nextProps))
        .forEach((name) => (dom[name] = null));

    Object.keys(nextProps)
        .filter(isAttr)
        .filter(isNew(prevProps, nextProps))
        .forEach((name) => (dom[name] = nextProps[name]));

    const prevStyle = prevProps.style || {};
    const nextStyle = nextProps.style || {};

    Object.keys(prevStyle)
        .filter(isGone(prevStyle, nextStyle))
        .forEach((name) => (dom.style[name] = ''));

    Object.keys(nextStyle)
        .filter(isNew(prevStyle, nextStyle))
        .forEach((key) => (dom.style[key] = nextStyle[key]));
}

// 创建dom节点
function createDomElement(fiber) {
    const isText = fiber.type === 'TEXT_ELEMENT';
    const dom = isText ? document.createTextNode('') : document.createElement(fiber.type);
    updateDomProperties(dom, [], fiber.props);
    return dom;
}

// 基类，提供setState默认方式
class Component {
    constructor(props) {
        this.props = props || {};
        this.state = this.state || {};
    }

    setState(partialState) {
        // 适当事件调用更新
        scheduleUpdate(this, partialState);
    }
}

// 创建类组件实例
function createInstance(fiber) {
    const instance = new fiber.type(fiber.props);
    instance.__fiber = fiber; // 当前实例对应fiber
    return instance;
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
    return createElement('TEXT_ELEMENT', { nodeValue: text });
}
