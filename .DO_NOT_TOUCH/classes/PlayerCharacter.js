import Phaser from "phaser";

export default class PlayerCharacter extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "player", 0);
    this.scene = scene;

    // Add to rendering engine
    scene.add.existing(this);
    // Add to physics engine
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true)
      .setDrag(500, 0)
      .setMaxVelocity(150, 300)
      .setInteractive()
      .setOrigin(); // fixes interactive offset issue

    // Create the animations we need from the player spritesheet
    const anims = scene.anims;
    anims.create({
      key: "player-idle",
      frames: anims.generateFrameNumbers("player", { start: 0, end: 3 }),
      frameRate: 3,
      repeat: -1
    });
    anims.create({
      key: "player-walk",
      frames: anims.generateFrameNumbers("player", { start: 5, end: 7 }),
      frameRate: 12,
      repeat: -1
    });
    this.anims.play("player-idle", true);

    // Track the arrow keys & OPQA
    const { LEFT, RIGHT, UP, Q, O, P, A } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      q: Q,
      o: O,
      p: P,
      a: A
    });

    // Hook into the scene's update event
    scene.events.on("update", this.update, this);
  }

  update() {
    const keys = this.keys;
    const sprite = this;
    const onGround =
      this.body.blocked.down || this.body.onFloor() || this.body.touching.down;
    const acceleration = onGround ? 600 : 200;

    // Apply horizontal acceleration when left/a or right/d are applied
    if (keys.left.isDown || keys.o.isDown) {
      sprite.setAccelerationX(-acceleration);
      sprite.setFlipX(true);
    } else if (keys.right.isDown || keys.p.isDown) {
      sprite.setAccelerationX(acceleration);
      sprite.setFlipX(false);
    } else {
      sprite.setAccelerationX(0);
    }

    // Only allow the player to jump if they are on the ground
    if (onGround && (keys.up.isDown || keys.q.isDown)) {
      sprite.setVelocityY(-400 * 2);
    }

    // Update the animation/texture based on the state of the player
    if (onGround) {
      if (sprite.body.velocity.x !== 0) {
        sprite.anims.play("player-walk", true);
      } else {
        sprite.anims.play("player-idle", true);
      }
    } else {
      sprite.anims.stop();
      sprite.setTexture("player", 4);
    }
  }

  destroy() {
    this.destroy();
  }
}
