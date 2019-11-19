import Phaser from "phaser";

export default class LaserScanner extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, requiredScanValues) {
    var width = 40;
    var height = 50;
    super(scene, x, y, width, height, 0x111111, 1);
    this.scene = scene;
    this.requiredScanValues = requiredScanValues;

    var gameHeight = scene.game.config.height;
    this.laser = scene.add
      .rectangle(x, parseInt(y + gameHeight / 2), 2, gameHeight, 0xff0000)
      .setAlpha(0.75);
    scene.add.existing(this);

    this.screens = [
      new LaserScannerScreen(
        scene,
        x,
        y + 15,
        30,
        12,
        this.requiredScanValues[0],
        0x009900
      ),
      new LaserScannerScreen(
        scene,
        x,
        y,
        30,
        12,
        this.requiredScanValues[1],
        0x006600
      ),
      new LaserScannerScreen(
        scene,
        x,
        y - 15,
        30,
        12,
        this.requiredScanValues[2],
        0x003300
      )
    ];

    this.currentRequiredScanValue = this.loadNextScanValue();

    // Hook into the scene's update event
    scene.events.on("update", this.update, this);
  }

  update(time, delta) {
    let thisPackage = this.scene.package;
    if (thisPackage != undefined) {
      //if (thisPackage.x == this.x) {
      if (Math.abs(thisPackage.x - this.x) <= 1) {
        if (thisPackage != this.lastScannedPackage) {
          this.lastScannedPackage = thisPackage;
          this.doPackageScan(thisPackage);
        }
      }
    }
  }

  doPackageScan(scannedPackage) {
    /*
    this.scene.tweens.add({
      targets: this,
      scaleX: 0.9,
      scaleY: 1.1,
      y: this.y - 5,
      ease: "Bounce", // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 150,
      repeat: 0, // -1: infinity
      yoyo: true
    });
    */
    if (scannedPackage.contents != this.currentRequiredScanValue) {
      scannedPackage.destroy();
    } else {
      this.laser.setFillStyle(0x00ff00);
      setTimeout(() => {
        this.laser.setFillStyle(0xff0000);
        this.currentRequiredScanValue = this.loadNextScanValue();
      }, 1000);
    }
  }

  loadNextScanValue() {
    this.updateScreenDisplays();
    return this.requiredScanValues.shift();
  }

  updateScreenDisplays() {
    // Clear all screens first... (we could do this more intelligently, but w.e)
    for (var i = 0; i < this.screens.length; i++) {
      this.screens[i].setDisplayValue("");
    }

    // Now show the correct values
    for (var i = 0; i < this.requiredScanValues.length; i++) {
      this.screens[i].setDisplayValue(this.requiredScanValues[i]);
    }
  }

  isComplete() {
    if (this.currentRequiredScanValue == undefined) return true;
    return false;
  }

  destroy() {
    this.scene.events.off("update", this.update, this);

    this.laser.destroy();
    for (var i = 0; i < this.screens.length; i++) {
      this.screens[i].destroy();
    }
    super.destroy();
  }
}

class LaserScannerScreen extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, width, height, displayValue, displayColor) {
    super(scene, x, y, width, height, displayColor, 1);
    this.scene = scene;
    scene.add.existing(this);

    this.displayText = scene.add
      .text(x, y, displayValue, {
        fill: "#22ff22",
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
