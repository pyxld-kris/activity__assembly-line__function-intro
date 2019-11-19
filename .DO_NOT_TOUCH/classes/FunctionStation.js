import Phaser from "phaser";

export default class FunctionStation extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, width, height, label, functionToExecute) {
    super(scene, x, y, width, height, 0x111111, 1);
    this.scene = scene;

    scene.add.existing(this);

    this.functionToExecute = functionToExecute;

    this.label = scene.add
      .text(x, parseInt(y - (width / 2) * 1.3), label, {
        fill: "#000000",
        fontSize: "16px",
        fontFamily: '"Press Start 2P"'
      })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setResolution(3) // Makes text more crisp
      .setScale(0.5); // Makes text more crisp

    // Hook into the scene's update event
    scene.events.on("update", this.update, this);
  }

  update(time, delta) {
    let thisPackage = this.scene.package;
    //if (thisPackage.x == this.x) {
    if (thisPackage) {
      if (Math.abs(thisPackage.x - this.x) <= 1) {
        if (thisPackage != this.lastScannedPackage) {
          this.lastScannedPackage = thisPackage;
          this.doPackageModification();
        }
      }
    }
  }

  doPackageModification() {
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
    this.functionToExecute();
  }

  destroy() {
    this.scene.events.off("update", this.update, this);

    this.label.destroy();
    super.destroy();
  }
}
