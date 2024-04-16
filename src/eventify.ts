export default class EventifyEmitter<EventMap extends {[event: string]: Record<any, any>}> {
    private listeners: {[Event in keyof EventMap]?: ((event: EventMap[Event]) => void)[]} = {};
    constructor() {}

    public on<Event extends keyof EventMap>(event: Event, callback: (event: EventMap[Event]) => void) {
        if (!(event in this.listeners)) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }
    
    public off<Event extends keyof EventMap>(event: Event, callback: (event: EventMap[Event]) => void) {
        this.listeners[event].filter(listener => listener != callback);
    }

    public emit<Event extends keyof EventMap>(event: Event, data: EventMap[Event]) {
        for (const listener of this.listeners[event]) listener(data);
    }
}