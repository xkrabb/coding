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

function render(element, parentDom) {
    const { type, props } = element;
    const isTextElement = type === TEXT_ELEMENT;
    const dom = isTextElement ? document.createTextNode('') : document.createElement(type);
    const isEvent = (key) => key.startsWith('on');
    const isAttr = (key) => !isEvent(key) && key !== 'children';

    Object.keys(props)
        .filter(isEvent)
        .forEach((key) => {
            const eventType = key.toLowerCase().substring(2);
            dom.addEventListener(eventType, props[key]);
        });

    Object.keys(props)
        .filter(isAttr)
        .forEach((key) => (dom[key] = props[key]));

    const childrenElements = props.children || [];
    childrenElements.forEach((element) => render(element, dom));

    parentDom.appendChild(dom);
}

const Didact = {
    render
};
