import { createContainer, updateContainer, flushSync, getPublicRootInstance } from './ReactFiberReconciler.js';
import { listenToAllSupportedEvents } from './DOMPluginEventSystem';

function hydrate() {}
function unmountComponentAtNode() {}
function findDOMNode() {}
function createPortal() {}

export function render(element, container, callback) {
    // v18 ReactDOM.createRoot
    return legacyRenderSubtreeIntoContainer(null, element, container, false, callback);
}

function legacyRenderSubtreeIntoContainer(parentComponent, children, container, forceHydrate, callback) {
    let root = container._reactRootContainer;
    let fiberRoot;
    if (!root) {
        root = container._reactRootContainer = legacyCreateRootFromDOMContainer(container, forceHydrate);
        fiberRoot = root;
        // getPublicRootInstance(fiberRoot) 获取实例，callback.call(instance)
        flushSync(() => {
            updateContainer(children, fiberRoot, parentComponent, callback);
        });
    } else {
        fiberRoot = root;
        // getPublicRootInstance(fiberRoot) 获取实例，callback.call(instance)
        updateContainer(children, fiberRoot, parentComponent, callback);
    }

    return getPublicRootInstance(fiberRoot);
}

// return FiberRoot
function legacyCreateRootFromDOMContainer(container, forceHydrate) {
    if (!forceHydrate) {
        // while删除container的lastChild
    }
    const root = createContainer(container, legacyRoot, forceHydrate, null, false, false, '');
    const rootContainerElement = container.nodeType === COMMENT_NODE ? container.parentNode : container;
    listenToAllSupportedEvents(rootContainerElement);

    return root;
}
