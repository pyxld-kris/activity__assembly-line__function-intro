import Phaser from "phaser";
import Package from "./Package.js";

export default class LaserScanner extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, packageValues) {
    var width = 50;
    var height = 50;
    super(scene, x, y, width, height, 0x111111, 1);
    this.scene = scene;
    this.packageValues = packageValues;

    var gameHeight = scene.game.config.height;
    scene.add.existing(this);

    this.screens = [
      new PackageProducerScreen(
        scene,
        x,
        y - 35,
        25,
        16,
        this.packageValues[0],
        0x8888ff
      ),
      new PackageProducerScreen(
        scene,
        x,
        y - 55,
        32,
        16,
        this.packageValues[1],
        0x6666ff
      ),
      new PackageProducerScreen(
        scene,
        x,
        y - 75,
        40,
        16,
        this.packageValues[2],
        0x4444ff
      )
    ];

    setTimeout(() => {
      this.producePackage();
    }, 2000);
    scene.events.on("package-destroyed", this.producePackage, this);

    // Hook into the scene's update event
    //scene.events.on("update", this.update, this);
  }

  producePackage() {
    if (this.packageValues.length > 0) {
      this.package = new Package(
        this.scene,
        this.x,
        this.y,
        this.width,
        this.height,
        this.packageValues.shift()
      );
      this.scene.package = this.package;
      this.updateScreenDisplays();
    }
  }

  updateScreenDisplays() {
    // Clear all screens first... (we could do this more intelligently, but w.e)
    for (var i = 0; i < this.screens.length; i++) {
      this.screens[i].setDisplayValue("");
    }

    // Now show the correct values
    for (var i = 0; i < this.packageValues.length; i++) {
      this.screens[i].setDisplayValue(this.packageValues[i]);
    }
  }

  isComplete() {
    if (this.packageValues.length == 0) return true;
    return false;
  }

  destroy() {
    this.scene.events.off("package-destroyed", this.producePackage, this);

    for (var i = 0; i < this.screens.length; i++) {
      this.screens[i].destroy();
    }
    super.destroy();
  }
}

class PackageProducerScreen extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, width, height, displayValue, displayColor) {
    super(scene, x, y, width, height, displayColor, 1);
    this.scene = scene;
    scene.add.existing(this);

    this.displayText = scene.add
      .text(x, y, displayValue, {
        fill: "#0000ff",
        fontSize: "16px",
        fontFamily: '"Press Start 2P"'
      })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setResolution(3) // Makes text more crisp
      .setScale(0.5); // Makes text more crisp
  }

  setDisplayValue(displayValue) {
    this.displayText.setText(displayValue);
  }

  destroy() {
    this.displayText.destroy();
    super.destroy();
  }
}
