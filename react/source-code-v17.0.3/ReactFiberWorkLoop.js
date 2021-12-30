let rootWithPendingPassiveEffects = null; //  FiberRoot | null

export function flushSync(fn) {
    // In legacy mode, we flush pending passive effects at the beginning of the
    // next event, not at the end of the previous one.
    if (
        rootWithPendingPassiveEffects !== null &&
        rootWithPendingPassiveEffects.tag === LegacyRoot &&
        (executionContext & (RenderContext | CommitContext)) === NoContext
    ) {
        flushPassiveEffects();
    }

    const prevExecutionContext = executionContext;
    executionContext |= BatchedContext;

    const prevTransition = ReactCurrentBatchConfig.transition;
    const previousPriority = getCurrentUpdatePriority();
    try {
        ReactCurrentBatchConfig.transition = 0;
        setCurrentUpdatePriority(DiscreteEventPriority);
        if (fn) {
            return fn();
        } else {
            return undefined;
        }
    } finally {
        setCurrentUpdatePriority(previousPriority);
        ReactCurrentBatchConfig.transition = prevTransition;
        executionContext = prevExecutionContext;
        if ((executionContext & (RenderContext | CommitContext)) === NoContext) {
            flushSyncCallbacks();
        }
    }
}

export function flushPassiveEffects() {}
