function completeUnitOfWork(unitOfWork) {
    let completeWork = unitOfWork;
    do {
        const current = completedWork.alternate;
        const returnFiber = completedWork.return;
        if ((completedWork.flags & Incomplete) === NoFlags) {
            const next = completeWork(current, completedWork, subtreeRenderLanes);

            // 有新的fiber返回则返回
            if (next !== null) {
                workInProgress = next;
                return;
            }
        } else {
            // fiber未完成操作
        }

        const siblingFiber = completeWork.sibling;
        if (siblingFiber !== null) {
            workInProgress = siblingFiber;
            return;
        }
        // 没有兄弟节点，返回父节点再处理
        completeWork = returnFiber;
        workInProgress = returnFiber;
    } while (completeWork !== null);

    // 没有提前返回，一直到complete === null说明已经导根节点
    if (workInProgressRootExitStatus === RootIncomplete) {
        workInProgressRootExitStatus = RootCompleted;
    }
}

function completeWork(current, workInProgress) {
    const newProps = workInProgress.pendingProps;

    switch (workInProgress.tag) {
        case HostComponent: {
            popHostContext(workInProgress);

            if (current !== null && workInProgress.stateNode != null) {
                updateHostComponent(current, workInProgress, type, newProps, rootContainerInstance);
            } else {
                // createInstance, appendAllChildren等方法平台相关，浏览器在react-dom/src/client/ReactDOMHostConfig下
                const instance = createInstance(
                    type,
                    newProps,
                    rootContainerInstance,
                    currentHostContext,
                    workInProgress
                );
                // mount则直接拼接所有兄弟节点到父节点上
                appendAllChildren(instance, workInProgress, false, false);

                workInProgress.stateNode = instance;
                // 更新属性,事件, auto处理，等
                if (finalizeInitialChildren(newInstance, type, newProps, rootContainerInstance, currentHostContext)) {
                    markUpdate(workInProgress);
                }
            }
            // lanes优先级处理
            bubbleProperties(workInProgress);
            return null;
        }
        // ...
    }
}

function updateHostComponent(current, workInProgress, type, newProps, rootContainerInstance) {
    if (oldProps === newProps) {
        return;
    }
    const updatePayload = prepareUpdate(instance, type, oldProps, newProps, rootContainerInstance, currentHostContext);
    // 提供commit阶段处理
    workInProgress.updateQueue = updatePayload;
}

function prepareUpdate() {
    // 属性处理，并将属性名和属性值放到updatePayload返回 ， updatePayload.push(propKey, propVal)
    diffProperties(domElement, type, oldProps, newProps, rootContainerInstance);
}
