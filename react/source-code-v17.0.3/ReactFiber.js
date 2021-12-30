const HostRoot = 3;

export function createHostRootFiber(tag, isStrictMode, concurrentUpdatesByDefaultOverride) {
    let mode;
    if (tag === ConcurrentRoot) {
        mode = ConcurrentMode; // 0b000001;
        // ....
    } else {
        mode = NoMode; // 0b000000;
    }
    return createFiber(HostRoot, null, null, mode);
}

const createFiber = function (tag, pendingProps, key, mode) {
    return new FiberNode(tag, pendingProps, key, mode);
};

function FiberNode(tag, pendingProps, key, mode) {
    // Instance
    this.tag = tag;
    this.key = key;
    this.elementType = null;
    this.type = null;
    this.stateNode = null;

    // Fiber
    this.return = null;
    this.child = null;
    this.sibling = null;
    this.index = 0;

    this.ref = null;

    this.pendingProps = pendingProps;
    this.memoizedProps = null;
    this.updateQueue = null;
    this.memoizedState = null;
    this.dependencies = null;

    this.mode = mode;

    // Effects
    this.flags = NoFlags;
    this.subtreeFlags = NoFlags;
    this.deletions = null;

    this.lanes = NoLanes;
    this.childLanes = NoLanes;

    this.alternate = null;

    if (enableProfilerTimer) {
        // ...
    }
}
