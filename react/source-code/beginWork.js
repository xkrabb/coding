function beginWork(current, workInProgress, renderLanes) {
    // update
    if (current !== null) {
        const oldProps = current.memoizedProps;
        const newProps = workInProgress.pendingProps;

        // includesSomeLane(updateLanes, renderLanes) 当前fiber更新优先级判断
        if (
            (oldProps === newProps && current.type === workInProgress.type) ||
            !checkScheduledUpdateOrContext(current, renderLanes)
        ) {
            didReceiveUpdate = false;
            // 复用节点
            return attemptEarlyBailoutIfNoScheduledUpdate(current, workInProgress, renderLanes);
        } else {
            didReceiveUpdate = true;
        }
    } else {
        didReceiveUpdate = false;
    }

    workInProgress.lanes = NoLanes;
    // mount
    switch (workInProgress.tag) {
        case FunctionComponent: {
            const Component = workInProgress.type;
            const unresolvedProps = workInProgress.pendingProps;
            const resolvedProps =
                workInProgress.elementType === Component
                    ? unresolvedProps
                    : resolveDefaultProps(Component, unresolvedProps);

            return updateFunctionComponent(current, workInProgress, Component, resolvedProps, renderLanes);
        }
        case ClassComponent: {
            // Component， resolvedProps 获取同上
            return updateClassComponent(current, workInProgress, Component, resolvedProps, renderLanes);
        }
        case HostComponent: {
            return updateHostComponent(current, workInProgress, renderLanes);
        }
        // 其他省略。。。
    }
}

function updateFunctionComponent(current, workInProgress, Component, nextProps, renderLanes) {
    if (!disableLegacyContext) {
        const unmaskedContext = getUnmaskedContext(workInProgress, Component, true);
        context = getMaskedContext(workInProgress, unmaskedContext);
    }

    // 返回 Component(props, secondArg) 执行结果
    const nextChildren = renderWithHooks(current, workInProgress, Component, nextProps, context, renderLanes);

    if (current !== null && !didReceiveUpdate) {
        // 复用
        bailoutHooks(current, workInProgress, renderLanes);
        return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes);
    }

    reconcileChildren(current, workInProgress, nextChildren, renderLanes);

    // 固定返回第一个子节点
    return workInProgress.child;
}

function reconcileChildren(current, workInProgress, nextChildren, renderLanes) {
    if (current === null) {
        // ChildReconciler(false)
        workInProgress.child = mountChildFibers(workInProgress, null, nextChildren, renderLanes);
    } else {
        // ChildReconciler(true)
        workInProgress.child = reconcileChildFibers(workInProgress, current.child, nextChildren, renderLanes);
    }
}

function ChildReconciler() {
    // 多节点diff ~~
    function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, lanes) {
        // 把新的都处理完成
        let resultingFirstChild = null;
        let previousNewFiber = null;
        let oldFiber = currentFirstChild;
        let lastPlacedIndex = 0;
        let newIdx = 0;
        let nextOldFiber = null; // 临时提取，操作完，赋值回oldFiber处理

        // newChild 通过 i++ 递增，oldFiber 通过 sibling 移动，一一对应判断。
        // 可复用，继续遍历。
        // 不可复用：key不同，结束当前循环； key相同，type不同，标记oldFiber 为 deletion，继续遍历。
        // 只任意一个遍历结束。
        for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {}

        // 新的遍历完，结束
        if (newIdx === newChildren.length) {
            deleteRemainingChildren(returnFiber, oldFiber);
            return resultingFirstChild;
        }

        // 旧的遍历完，单独处理剩下新的，结束
        if (oldFiber === null) {
            // 处理多出来的newChildren
            for (; newIdx < newChildren.length; newIdx++) {}
            return resultingFirstChild;
        }

        // 构建old节点的map => key值为 key || index， 值为fiber（sibling遍历）
        const existingChildren = mapRemainingChildren(returnFiber, oldFiber);

        // 新的，旧的都还有，根据key，判断是否复用，是否移动
        // 遍历 newChildren 的 key是否在旧的 key 里。存在则复用，并标记是否移动；不存在新建。
        // lastPlacedIndex 上次节点复用（且不需要移动） oldFiber位置；oldIndex 本次可复用节点 oldFiber位置；
        // 正常情况，oldIndex >= lastPlacedIndex (节点不需要移动)；否则，oldFiber 需要移动位置，才符合新的节点。
        for (; newIdx < newChildren.length; newIdx++) {}

        // 剩下未处理完的old节点，都删除
        if (shouldTrackSideEffects) {
            existingChildren.forEach((child) => deleteChild(returnFiber, child));
        }

        return resultingFirstChild;
    }

    // 单节点
    function reconcileSingleElement(returnFiber, currentFirstChild, element, lanes) {
        const key = element.key;
        let child = currentFirstChild;
        while (child !== null) {
            if (child.key === key) {
                // 判断类型是否相同，决定是否复用。REACT_FRAGMENT_TYPE 单独处理
                if (element.elementType === child.elementType) {
                    const existing = useFiber(child, element.props.children);
                    existing.return = returnFiber;
                    return existing;
                }

                // key相同，又不能复用，后面都可以不用操作
                deleteRemainingChildren(returnFiber, child);
                break;
            } else {
                deleteChild(returnFiber, child);
            }
            child = child.sibling;
        }

        // 更具type创建新的fiber，如果REACT_FRAGMENT_TYPE缺少ref处理 ...
        return newFiber;
    }

    function reconcileChildFibers1(returnFiber, currentFistChild, newChild, lanes) {
        if (typeof newChild === 'object' && newChild !== null) {
            // 单节点
            switch (newChild.$$typeof) {
                case REACT_ELEMENT_TYPE:
                    return placeSingleChild(reconcileSingleElement(returnFiber, currentFirstChild, newChild, lanes));
                //  REACT_PORTAL_TYPE, REACT_LAZY_TYPE 省略
            }

            // 数组
            if (isArray(newChild)) {
                return reconcileChildrenArray(returnFiber, currentFirstChild, newChild, lanes);
            }

            // 可迭代对象
            if (getIteratorFn(newChild)) {
                return reconcileChildrenIterator(returnFiber, currentFirstChild, newChild, lanes);
            }
        }

        if (typeof newChild === 'string' || typeof newChild === 'number') {
            // 文本节点
            return placeSingleChild(reconcileSingleTextNode(returnFiber, currentFirstChild, '' + newChild, lanes));
        }
        // while(current.sibling) 删除生效的兄弟节点 - 删除：标记flags(原effectTag)，将fiber推入returnFiber的 deletions中
        return deleteRemainingChildren(returnFiber, currentFirstChild);
    }

    return reconcileChildFibers1;
}
