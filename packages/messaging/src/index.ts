type Callback<T = any> = (data: T) => void;

class MessageBus {
    private listeners: Map<string, Callback[]>;

    constructor() {
        this.listeners = new Map();
    }

    /**
     * Subscribe to a specific channel/action topic
     * @param topic Must follow the generic pattern 'channel/action' (e.g. 'vault/unlock')
     * @param callback Function to trigger when published
     */
    subscribe<T = any>(topic: string, callback: Callback<T>): void {
        if (!this.listeners.has(topic)) {
            this.listeners.set(topic, []);
        }
        this.listeners.get(topic)!.push(callback);
    }

    /**
     * Unsubscribe a specific callback from a topic
     */
    unsubscribe<T = any>(topic: string, callback: Callback<T>): void {
        const topicListeners = this.listeners.get(topic);
        if (!topicListeners) return;

        this.listeners.set(
            topic,
            topicListeners.filter((cb) => cb !== callback)
        );
    }

    /**
     * Publish data to a specific topic across the application
     */
    publish<T = any>(topic: string, data?: T): void {
        const topicListeners = this.listeners.get(topic);
        if (topicListeners) {
            topicListeners.forEach((callback) => callback(data));
        }
    }
}

// Export as a singleton so all microapps use the exact same event bus instance in memory
export const bus = new MessageBus();
