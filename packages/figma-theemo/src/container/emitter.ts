export default class Emitter {
  sendEvent(name, data) {
    figma.ui.postMessage({ event: name, data });
  }
}