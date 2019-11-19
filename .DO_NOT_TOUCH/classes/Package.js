import Phaser from "phaser";

export default class Package extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, width, height, contents) {
    super(scene, x, y, width, height, 0x997755, 1);
    this.scene = scene;

    scene.add.existing(this).setDepth(-1);

    this.moveSpeed = 2;
    this.targetX = 600;
    this.contents = contents;

    this.label = scene.add
      .text(x, y, contents, {
        fill: "#ffffff",
        fontSize: "32px",
        fontFamily: '"Press Start 2P"'
      })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setResolution(3) // Makes text more crisp
      .setScale(0.5)
      .setDepth(-1); // Makes text more crisp

    /*
    // Add to rendering engine
    scene.add.existing(this);
    // Add to physics engine
    scene.physics.add.existing(this, true); // true makes object static
    */

    // Hook into the scene's update event
    scene.events.on("update", this.update, this);
  }

  setX(x) {
    super.setX(x);
    this.label.setX(x);
  }

  setTargetX(targetX) {
    this.targetX = targetX;
  }

  setContents(value) {
    this.contents = value;
    this.label.setText(value);
  }

  update(time, delta) {
    if (this.x != this.targetX) {
      let distance = this.targetX - this.x;
      if (Math.abs(distance) > this.moveSpeed) {
        let normalized = distance / Math.abs(distance);
        this.setX(this.x + normalized * this.moveSpeed);
      } else {
        this.setX(this.targetX);
      }
    } else {
      this.destroy();
    }
  }

  destroy() {
    // Tell other areas of the game that this package has been destroyed
    this.scene.events.emit("package-destroyed");

    // unhook from the scene's update event
    this.scene.events.off("update", this.update, this);

    // Destroy this package's label
    this.label.destroy();

    // Call Phaser3's internal destroy for this object
    super.destroy();
  }
}
