import { createHostRootFiber } from './ReactFiber';
import { initializeUpdateQueue } from './ReactUpdateQueue';

export function createFiberRoot(
    containerInfo,
    tag,
    hydrate,
    hydrationCallbacks,
    isStrictMode,
    concurrentUpdatesByDefaultOverride,
    identifierPrefix
) {
    // fiber root node
    const root = new FiberRootNode(containerInfo, tag, hydrate, identifierPrefix);
    // fiber
    const uninitializedFiber = createHostRootFiber(tag, isStrictMode, concurrentUpdatesByDefaultOverride);

    root.current = uninitializedFiber;
    uninitializedFiber.stateNode = root;

    const initialState = {
        element: null
    };
    uninitializedFiber.memoizedState = initialState;

    initializeUpdateQueue(uninitializedFiber);

    return root;
}

function FiberRootNode(containerInfo, tag, hydrate, identifierPrefix) {
    this.tag = tag;
    this.containerInfo = containerInfo;
    this.pendingChildren = null;
    this.current = null;
    this.pingCache = null;
    this.finishedWork = null;
    this.timeoutHandle = noTimeout;
    this.context = null;
    this.pendingContext = null;
    this.isDehydrated = hydrate;
    this.callbackNode = null;
    this.callbackPriority = NoLane;
    this.eventTimes = createLaneMap(NoLanes);
    this.expirationTimes = createLaneMap(NoTimestamp);

    this.pendingLanes = NoLanes;
    this.suspendedLanes = NoLanes;
    this.pingedLanes = NoLanes;
    this.expiredLanes = NoLanes;
    this.mutableReadLanes = NoLanes;
    this.finishedLanes = NoLanes;

    this.entangledLanes = NoLanes;
    this.entanglements = createLaneMap(NoLanes);

    this.identifierPrefix = identifierPrefix;
    // ....
}
