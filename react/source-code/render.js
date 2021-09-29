// performSyncWorkOnRoot调用该方法
function workLoopSync() {
    while (workInProgress !== null) {
        performUnitOfWork(workInProgress);
    }
}

// performConcurrentWorkOnRoot调用该方法
function workLoopConcurrent() {
    // shouldYield来自scheduler
    while (workInProgress !== null && !shouldYield()) {
        performUnitOfWork(workInProgress);
    }
}

// 根据当前fiber创建子fiber，构建fiber树，获取下一个执行fiber
function performUnitOfWork(unitOfWork) {
    // mount阶段current
    const current = unitOfWork.alternate;
    // 深度遍历，往下构建节点，并构建fiber tree
    const next = beginWork(current, unitOfWork, subTreeLanes);

    unitOfWork.memoizedProps = unitOfWork.pendingProps;

    if (next === null) {
        // 往上递归，更新属性，直到rootFiber
        completeWork(current, unitOfWork, subTreeLanes);
    } else {
        workInProgress = next;
    }

    // shared目录下共享文件
    ReactCurrentOwner.current = null;
}
