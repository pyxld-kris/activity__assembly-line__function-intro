import Phaser from "phaser";
import successSound from "../../_assets/success.wav";

export default class Noise {
  constructor(scene) {
    this.scene = scene;

    // Hook this classes personal function into the scene (temporary)
    scene.load.on("filecomplete", this.playSound, this);

    // Now queue up our specific file, and then start loading
    scene.load.audio("success-sound", successSound);
    scene.load.start();
  }

  playSound(key, type, texture) {
    if (key === "success-sound") {
      var successNoise = this.scene.sound.add("success-sound");
      successNoise.play();

      // Unhook this event from the scene's file loader
      this.scene.load.off("filecomplete", this.playSound);
    }
  }
}
