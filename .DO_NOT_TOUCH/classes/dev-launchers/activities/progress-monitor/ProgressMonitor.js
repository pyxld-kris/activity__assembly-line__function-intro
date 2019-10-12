import Phaser from "phaser";

export default class SuccessMonitor {
  constructor(scene, progressCheckFunc) {
    this.scene = scene;
    this.progressCheckFunc = progressCheckFunc; // called in update 5% of time

    // progressData will be set at different points in the scene, depending on
    //    individual lesson requirements. It is then checked against in
    //    update() to determine if the activity has been completed
    scene.progressData = {};

    // Attach an event handler to the 'update' event, which is
    //  emitted when the current scene's update function fires
    this.updateListener = scene.events.on("update", (time, delta) => {
      this.update(time, delta);
    });
  }

  update(time, delta) {
    // We don't want to do these checks every frame.
    // Let's do them a certain percentage of the time, randomly
    if (Math.random() < 0.05) {
      // Randomly perform check 5% of the time
      this.progressCheckFunc.call(this);
    }
  }

  destroy() {
    // Remove this object's update listener from the scene
    this.scene.events.removeListener("update", this.updateListener);
  }
}
