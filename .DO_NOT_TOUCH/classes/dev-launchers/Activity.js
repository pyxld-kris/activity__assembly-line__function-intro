export default class Activity {
  constructor(scene, initFunc, destroyFunc) {
    this.scene = scene;
    this.initFunc = initFunc;
    this.destroyFunc = destroyFunc;
  }

  init() {
    this.initialize();
  }
  initialize() {
    this.initFunc();
  }

  destroy() {
    this.destroyFunc();
  }
}
