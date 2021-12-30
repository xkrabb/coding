export function initializeUpdateQueue(fiber) {
    const queue = {
        baseState: fiber.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
            pending: null,
            interleaved: null,
            lanes: NoLanes
        },
        effects: null
    };
    fiber.updateQueue = queue;
}

export function createUpdate(eventTime, lane) {
    return {
        eventTime,
        lane,
        tag: UpdateState,
        payload: null,
        callback: null,
        next: null
    };
}

export function enqueueUpdate(fiber, update, lane) {
    const updateQueue = fiber.updateQueue;
    if (!updateQueue) return;

    const sharedQueue = updateQueue.shared;
    if (isInterleavedUpdate(fiber, lane)) {
        const interleaved = sharedQueue.interleaved;
        if (!interleaved) {
            update.next = update;
            pushInterleavedQueue(sharedQueue);
        } else {
            update.next = interleaved.next;
            interleaved.next = update;
        }
        sharedQueue.interleaved = update;
    } else {
        const pending = sharedQueue.pending;
        if (!pending) {
            update.next = update;
        } else {
            update.next = pending.next;
            pending.next = update;
        }
        sharedQueue.pending = update;
    }
}
