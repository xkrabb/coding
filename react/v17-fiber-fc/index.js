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
function render(element, container) {
    const { type, props } = element;

    const dom = type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(type);

    const isAttr = (key) => key !== 'children' && key !== 'style';
    const isEvent = (key) => key.startsWith('on');

    Object.keys(props)
        .filter(isAttr)
        .forEach((key) => {
            dom[key] = props[key];
        });

    props.children.forEach((child) => {
        render(child, dom);
    });
    container.appendChild(dom);
}

const Didact = {
    createElement,
    render
};
