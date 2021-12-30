const listeningMarker = '_reactListening' + Math.random().toString(36).slice(2);
const nonDelegatedEvents = [];

// EventRegistry.js
const allNativeEvents = [];

export function listenToAllSupportedEvents(rootContainerElement) {
    if (!rootContainerElement[listeningMarker]) {
        rootContainerElement[listeningMarker] = true;
        allNativeEvents.forEach((domEventName) => {
            if (domEventName !== 'selectionchange') {
                if (!nonDelegatedEvents.has(domEventName)) {
                    listenToNativeEvent(domEventName, false, rootContainerElement);
                }
                listenToNativeEvent(domEventName, true, rootContainerElement);
            }
        });
        // DOCUMENT_NODE : 9
        const ownerDocument =
            rootContainerElement.nodeType === DOCUMENT_NODE ? rootContainerElement : rootContainerElement.ownerDocument;

        if (ownerDocument !== null) {
            if (!ownerDocument[listeningMarker]) {
                ownerDocument[listeningMarker] = true;
                listenToNativeEvent('selectionchange', true, ownerDocument);
            }
        }
    }
}

export function listenToNativeEvent() {}
