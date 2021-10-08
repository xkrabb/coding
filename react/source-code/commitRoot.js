// performSyncWorkOnRoot最后调用commitRoot
function commitRoot(root) {
    commitRootImpl(root, previousUpdateLanePriority);
}

// 主要三步： before mutation - mutation - layout
function commitRootImpl(root, renderPriorityLevel) {
    // 执行完之前是effect回调
    do {
        flushPassiveEffects();
    } while (rootWithPendingPassiveEffects !== null);
    // ...

    // scheduleCallback 异步安排 flushPassiveEffects
    if (!rootDoesHavePassiveEffects) {
        rootDoesHavePassiveEffects = true;
        scheduleCallback(NormalSchedulerPriority, () => {
            flushPassiveEffects();
            return null;
        });
    }

    const shouldFireAfterActiveInstanceBlur = commitBeforeMutationEffects(root, finishedWork);
    commitMutationEffects(root, finishedWork, lanes);
    commitLayoutEffects(finishedWork, root, lanes);

    // useEffect调度, lanes, Profiler相关处理
    const rootDidHavePassiveEffects = rootDoesHavePassiveEffects;
    // 重新赋值 rootWithPendingPassiveEffects，用于下次 flushPassiveEffects
    if (rootDoesHavePassiveEffects) {
        rootDoesHavePassiveEffects = false;
        rootWithPendingPassiveEffects = root;
        pendingPassiveEffectsLanes = lanes;
    }

    // 下次空闲优先级够用执行 performSyncWorkOnRoot
    ensureRootIsScheduled(root, now());
    // ...
    flushSyncCallbacks();
}

// before mutation： 删除/处理blur；调用getSnapshotBeforeUpdate声明周期
function commitBeforeMutationEffects(root, fistChild) {
    nextEffect = firstChild;
    commitBeforeMutationEffects_begin();
}

function commitBeforeMutationEffects_begin() {
    while (nextEffect !== null) {
        // 循环 fiber.deletions 执行删除
        commitBeforeMutationEffectsDeletion(deletion);
        if (child !== null) {
            nextEffect = child;
        } else {
            commitBeforeMutationEffects_complete();
        }
    }
}

function commitBeforeMutationEffects_complete() {
    while (nextEffect !== null) {
        try {
            commitBeforeMutationEffectsOnFiber();
        } catch (err) {}

        const sibling = fiber.sibling;
        if (sibling !== null) {
            ensureCorrectReturnPointer(sibling, fiber.return);
            nextEffect = sibling;
            return;
        }

        nextEffect = fiber.return;
    }
}

function commitBeforeMutationEffectsOnFiber(finishedWork) {
    beforeActiveInstanceBlur(finishedWork);

    switch (finishedWork.tag) {
        case FunctionComponent:
        case ForwardRef:
        case SimpleMemoComponent: {
            break;
        }
        case ClassComponent: {
            instance.getSnapshotBeforeUpdate(
                finishedWork.elementType === finishedWork.type
                    ? prevProps
                    : resolveDefaultProps(finishedWork.type, prevProps),
                prevState
            );
        }
    }
}

// 调度useEffect, 获取rootWithPendingPassiveEffects，遍历执行effect回调
function flushPassiveEffects() {
    flushPassiveEffectsImpl();
}

function flushPassiveEffectsImpl() {
    // 获取syncQueue，遍历执行回调
    flushSyncCallbacks();
}

// mutation 阶段, 遍历tree，根据flags执行dom操作；同before mutation遍历
function commitMutationEffects(root, firstChild, committedLanes) {
    // 提前执行删除  commitDeletion(root, childToDelete, fiber);
    commitMutationEffects_begin(root);
    // commitDeletion(root, childToDelete, fiber)
    // commitMutationEffects_complete(root)
}

// 根据 flags 进行dom操作
function commitMutationEffectsOnFiber(finishedWork, root) {
    const primaryFlags = flags & (Placement | Update | Hydrating);
    switch (primaryFlags) {
        case Placement: {
            commitPlacement(finishedWork);
        }
        case Update: {
            commitWork(current, finishedWork);
        }
        case PlacementAndUpdate: {
            commitPlacement(finishedWork);
            commitWork(current, finishedWork);
        }
    }
}

// 递归调用子孙节点，ClassComponent的componentWillUnmount 生命周期钩子
// 解绑ref
// 调用useEffect销毁函数
function commitDeletion(finishedRoot, current, fiber) {
    unmountHostComponents();
    // commitNestedUnmounts
    // commitUnmount
}

// 插入时候，fiber节点到dom节点，兄弟节点间查找比较耗时
function commitPlacement() {}

// 根据不同tag调用处理，hooks销毁函数，dom更新操作
function commitWork() {}

function commitLayoutEffects() {
    // 调用commitLayoutEffects_begin， commitLayoutMountEffects_complete 遍历effectTag
    // commitLayoutEffectOnFiber
}

function commitLayoutEffectOnFiber(finishedRoot, current, finishedWork, lanes) {
    switch (finishedWork.tag) {
        case FunctionComponent:
            // 遍历所有effect，执行create，返回值作为destroy
            commitHookEffectListMount(HookLayout | HookHasEffect, finishedWork);
        case ClassComponent: {
            // 生命周期钩子
            if (current === null) {
                instance.componentDidMount();
            } else {
                instance.componentDidUpdate();
            }
        }
    }

    commitAttachRef(finishedWork);
}
