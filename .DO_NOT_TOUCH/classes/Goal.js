import Phaser from "phaser";

export default class Goal extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, width, height, tint) {
    super(scene, x, y, scene.generateRectangleSprite(width, height));
    this.scene = scene;

    if (tint !== undefined) this.setTint(tint);

    // Add to rendering engine
    scene.add.existing(this);
    // Add to physics engine
    scene.physics.add.existing(this, true); // true makes object static
  }

  destroy() {
    super.destroy();
  }
}
