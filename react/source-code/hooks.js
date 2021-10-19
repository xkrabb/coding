let isMount = true; // 是否首次渲染
let workInProgressHook = null; // 当前工作的hook

// 与App函数组件对应的fiber
const fiber = {
    stateNode: App, // FC指向函数
    memoizedState: null // FC里保存第一个hook, 可能多次调用useState，保存在单链表上
};

// mount时候，需要构建hooks单链；计算action调用后state
function useState(initialState) {
    let hook = null;

    if (isMount) {
        hook = {
            memoizedState: initialState,
            next: null,
            queue: {
                pending: null // updates queue
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

    let baseState = hook.memoizedState;
    if (hook.queue.pending) {
        let firstUpdate = hook.queue.pending.next;
        do {
            const action = firstUpdate.action;
            baseState = action(baseState);
            firstUpdate = firstUpdate.next;
        } while (firstUpdate !== hook.queue.pending);
        hook.queue.pending = null;
    }

    hook.memoizedState = baseState;
    return [baseState, dispatchAction.bind(null, hook.queue)];
}

// 构建环状更新链；set回调；调度更新
function dispatchAction(queue, action) {
    const update = {
        action,
        next: null
    };

    if (queue.pending === null) {
        update.next = update;
    } else {
        update.next = queue.pending.next;
        queue.pending.next = update;
    }
    queue.pending = update; // 上次的update

    schedule();
}

// 模拟调度
function schedule() {
    workInProgressHook = fiber.memoizedState;
    const app = fiber.stateNode(); // 触发render
    isMount = false;
    return app;
}

function App() {
    const [num, setNum] = useState(0);
    const [str, setStr] = useState('');
    console.log(isMount ? 'is mount' : 'is update', ' number is ', num, ', string is ', str);
    // return <p onClick={() => updateNum((num) => num + 1)}>{num}</p>;
    return {
        onclick: () => setNum((num) => num + 1),
        onDouble: () => setNum((num) => num + 2),
        append: () => setStr((str) => str + 'str+')
    };
}

window.app = schedule();
