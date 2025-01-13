const events = {};

function subscribe(eventName, handler) {
    if (!events[eventName]) {
        events[eventName] = [];
    }

    events[eventName].push(handler);
}

function publish(eventName, data) {
    events[eventName].forEach(handler => handler(data));
}

export default {
    subscribe,
    publish,
}
