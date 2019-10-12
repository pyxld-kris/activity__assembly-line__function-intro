import Phaser from "phaser";

export default class Instruction {
  constructor(scene, instructionString, displayDuration) {
    this.scene = scene;
    this.instructionString = instructionString;
    this.displayDuration = displayDuration;
  }

  display() {
    let scene = this.scene;

    let halfScreenWidth = scene.game.config.width / 2;
    let halfScreenHeight = scene.game.config.height / 2;
    this.text = scene.add
      .text(halfScreenWidth, -10, this.instructionString, {
        fontSize: "16px",
        fontFamily: '"Press Start 2P"',
        fill: "#000000",
        align: "center",
        padding: { x: 1, y: 1 },
        backgroundColor: "transparent"
      })
      .setOrigin(0.5, 0)
      .setScrollFactor(0)
      .setResolution(3) // Makes text more crisp
      .setScale(0.5); // Makes text more crisp
    this.textTween = scene.tweens.add({
      targets: this.text,
      y: halfScreenHeight, // '+=100'
      ease: "Bounce", // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 1000,
      repeat: -1, // -1: infinity
      yoyo: true
    });

    this.destroyTimer = scene.time.addEvent({
      delay: this.displayDuration, // ms
      callback: () => {
        this.destroy();
      }
    });
  }

  destroy() {
    if (this.textTween !== undefined) this.textTween.complete();
    if (this.textTween !== undefined) this.text.destroy();
  }
}
