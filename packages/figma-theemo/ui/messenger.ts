export default class Messenger {
  private listener: Map<string, Set<Function>> = new Map();
  constructor() {

    window.addEventListener('message', (event: MessageEvent) => {
      this.readMessage(event);
    });
  }

  addListener(event: string, listener: Function) {
    if (!this.listener.has(event)) {
      this.listener.set(event, new Set());
    }

    this.listener.get(event).add(listener);
  }

  removeListener(event: string, listener: Function) {
    if (this.listener.has(event)) {
      this.listener.get(event).delete(listener);
    }
  }

  private readMessage(event: MessageEvent) {
    const message = event.data.pluginMessage;

    if (message.event) {
      if (this.listener.has(message.event)) {
        for (const listener of this.listener.get(message.event)) {
          listener.call({}, message.data);
        }
      }
    }
  }

  send(command: string, data?: any) {
    parent.postMessage({ pluginMessage: { command, data } }, '*');
  }
}