function reconcileSingleElement(returnFiber, currentFirstChild, element, lanes) {
    const key = element.key;
    let child = currentFirstChild;
    while (child !== null) {
        if (key === child.key) {
            if (child.tag === element.type) {
                deleteRemainingChildren(returnFiber, child.sibling);
                // tag是否为Fragment，useFiber传递参数不同，类似函数尾处理
                const existing = useFiber();
                existing.return = returnFiber;
                return existing;
            }

            deleteRemainingChildren(returnFiber, child);
        } else {
            deleteChild(returnFiber, child);
        }
        child = child.sibling;
    }

    if (element.type === REACT_FRAGMENT_TYPE) {
        // createFiberFromFragment 调用 createFiber
        const created = createFiberFromFragment(element.props.children, returnFiber.mode, lanes, element.key);
        created.return = returnFiber;
        return created;
    } else {
        // createFiberFromElement 调用 createFiberFromTypeAndProps
        // createFiberFromTypeAndProps 根据type重新定义 createFiber 的第一个参数
        const created = createFiberFromElement(element, returnFiber.mode, lanes);
        created.ref = coerceRef(returnFiber, currentFirstChild, element);
        created.return = returnFiber;
        return created;
    }
}

function reconcileChildrenArray(returnFiber, currentFistChild, newChildren, lanes) {
    // 未使用双指针遍历，子节点是单链
    let resultingFirstChild = null; // 结果子节点
    let previousNewFiber = null; // 用于结果子节点的单链创建
    let oldFiber = currentFirstChild;
    let lastPlacedIndex = 0; // 旧子节点中被复用时最右边的index
    let newIdx = 0;
    let nextOldFiber = null; // 编辑下一个旧节点，用于遍历旧子节点时候恢复

    // 遍历新旧节点都存在
    for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
        if (oldFiber.index > newIdx) {
            nextOldFiber = oldFiber;
            oldFiber = null;
        } else {
            nextOldFiber = oldFiber.sibling;
        }

        // key相同，type相同复用，type不同新建； key不同返回null
        const newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx], lanes);

        if (newFiber === null) {
            if (oldFiber === null) {
                oldFiber = nextOldFiber;
            }
            break;
        }
        // 更新情况
        if (shouldTrackSideEffects) {
            if (oldFiber && newFiber.alternate === null) {
                deleteChild(returnFiber, oldFiber);
            }
        }
        // oldIndex < lastPlacedIndex 返回 lastPlacedIndex； 否则 返回oldIndex
        lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
        // 拼接结果单链
        if (previousNewFiber === null) {
            resultingFirstChild = newFiber;
        } else {
            previousNewFiber.sibling = newFiber;
        }
        previousNewFiber = newFiber;
        oldFiber = nextOldFiber;
    }

    // 结束情况
    if (newIdx === newChildren.length) {
        deleteRemainingChildren(returnFiber, oldFiber);
        return resultingFirstChild;
    }
    if (oldFiber === null) {
        for (; newIdx < newChildren.length; newIdx++) {
            // 剩余新节点处理： placeChild，构建result单链
            const newFiber = createChild(returnFiber, newChildren[newIdx], lanes);
        }
        return resultingFirstChild;
    }

    // 如果新旧节点都未遍历结束
    // 根据旧节点构建key的map
    const existingChildren = mapRemainingChildren(returnFiber, oldFiber);
    for (; newIdx < newChildren.length; newIdx++) {
        // 判断新节点是否存在旧map中
        const newFiber = updateFromMap(existingChildren, returnFiber, newIdx, newChildren[newIdx], lanes);
        if (newFiber !== null) {
            if (shouldTrackSideEffects) {
                if (newFiber.alternate !== null) {
                    // 更新时候匹配过就删掉map
                    existingChildren.delete(newFiber.key === null ? newIdx : newFiber.key);
                }
            }
            //节点处理： placeChild，构建result单链
        }
    }

    // 更新时候删除没有匹配上的旧节点
    if (shouldTrackSideEffects) {
        existingChildren.forEach((child) => deleteChild(returnFiber, child));
    }

    return resultingFirstChild;
}
