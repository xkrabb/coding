let isMount = true;
let workInProgressHook = null;

const fiber = {
    stateNode: App,
    memoizedState: null,
    queue: {
        pending: null,
        next: null
    }
};

function useState(initState) {
    let hook;
    if (isMount) {
        hook = {
            memoizedState: initState,
            next: null,
            queue: {
                pending: null
            }
        };
        if (!fiber.memoizedState) {
            fiber.memoizedState = hook;
        } else {
            workInProgressHook.next = hook;
        }
        workInProgressHook = hook;
    } else {
        hook = workInProgressHook;
        workInProgressHook = workInProgressHook.next;
    }
    // 根据基础状态计算
    let baseState = hook.memoizedState;
    if (hook.queue.pending) {
        let firstUpdate = hook.queue.pending.next;

        do {
            const action = firstUpdate.action;
            baseState = action(baseState); // 只考虑函数形式
            firstUpdate = firstUpdate.next;
        } while (firstUpdate !== hook.queue.pending.next);
        hook.queue.pending = null;
    }
    hook.memoizedState = baseState;
    return [baseState, dispatchAction.bind(null, hook.queue)];
}

function dispatchAction(queue, action) {
    const update = {
        action,
        next: null
    };

    if (queue.pending === null) {
        // u0-u0
        update.next = update;
    } else {
        // u1-u0-u1
        update.next = queue.pending.next;
        queue.pending.next = update;
    }
    queue.pending = update;

    schedule();
}

function schedule() {
    workInProgressHook = fiber.memoizedState;
    const app = fiber.stateNode();
    isMount = false;
    return app;
}

function App() {
    const [num, updateNum] = useState(0);
    const [num1, updateNum1] = useState(10);

    console.log('isMount', isMount);
    console.log('number', num);
    console.log('number1', num1);

    return {
        onclick() {
            updateNum((num) => num + 1);
        },
        onFocus() {
            updateNum1((num) => num + 10);
        }
    };
}

window.app = schedule();
