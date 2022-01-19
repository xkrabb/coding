const workList = [];

function schedule() {
    // 源码利用最小栈取的
    const curWork = workList.sort((a, b) => a.priority - b.priority)[0];
    if (curWork) {
        perform(curWork);
    }
}

function perform(work) {
    while (work.count > 0) {
        work.count--;
        insertItem(work.count);
    }
    schedule();
}

function insertItem(count) {
    console.log('页面插入标签, 第', count, '个');
}

// 初始化后开始地调度
workList.unshift({ count: 100, priority: 1 });
schedule();
