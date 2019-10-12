import Phaser from "phaser";

export default class FloatingPlatform extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, platformWidth, platformHeight, label) {
    super(scene, x, y, scene.generateRectangleSprite(platformWidth, 5));
    this.scene = scene;

    this.moveSpeed = 4;
    this.targetX = x;

    this.column = scene.add
      .sprite(
        x,
        y - platformHeight / 2 + 5,
        scene.generateRectangleSprite(
          parseInt(platformWidth - 4),
          platformHeight + 10
        )
      )
      .setTint(0x888888);

    this.platform = scene.physics.add.staticSprite(
      x,
      y - platformHeight,
      scene.generateRectangleSprite(platformWidth - 4, 4)
    );

    this.label = scene.add
      .text(x, y, label, {
        fill: "#ffffff",
        fontSize: "16px",
        fontFamily: '"Press Start 2P"'
      })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setResolution(3) // Makes text more crisp
      .setScale(0.5); // Makes text more crisp

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
    this.column.setX(x);
    this.label.setX(x);
    this.platform.setX(x);
    this.platform.body.x = x - this.platform.width / 2;
  }

  setTargetX(targetX) {
    this.targetX = targetX;
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
    }
  }

  destroy() {
    this.platform.destroy();
    this.label.destroy();
    super.destroy();
  }
}
