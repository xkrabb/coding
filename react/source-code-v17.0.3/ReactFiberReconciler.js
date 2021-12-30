import { createFiberRoot } from './ReactFiberRoot.js';
export { flushSync } from './ReactFiberWorkLoop';
import { createUpdate, enqueueUpdate } from './ReactUpdateQueue';

export function updateContainer(element, container, parentComponent, callback) {
    const current = container.current;
    const eventTime = requestEventTime();
    const lane = requestUpdateLane(current);

    const context = getContextForSubtree(parentComponent);
    if (container.context === null) {
        container.context = context;
    } else {
        0;
        container.pendingContext = context;
    }
    const update = createUpdate(eventTime, lane);
    update.payload = { element };
    if (callback) {
        update.callback = callback;
    }
    enqueueUpdate(current, update, lane);
    const root = scheduleUpdateOnFiber(current, lane, eventTime);

    if (root !== null) {
        entangleTransitions(root, current, lane); // 更新过渡优先级
    }

    return lane;
}

export function getPublicRootInstance(container) {
    const containerFiber = container.current;
    if (!containerFiber.child) {
        return null;
    }
    switch (containerFiber.child.tag) {
        case HostComponent:
            return getPublicInstance(containerFiber.child.stateNode);
        default:
            return containerFiber.child.stateNode;
    }
}

export function createContainer(
    containerInfo,
    tag,
    hydrate,
    hydrationCallbacks,
    isStrictMode,
    concurrentUpdatesByDefaultOverride,
    identifierPrefix
) {
    return createFiberRoot(
        containerInfo,
        tag,
        hydrate,
        hydrationCallbacks,
        isStrictMode,
        concurrentUpdatesByDefaultOverride,
        identifierPrefix
    );
}
