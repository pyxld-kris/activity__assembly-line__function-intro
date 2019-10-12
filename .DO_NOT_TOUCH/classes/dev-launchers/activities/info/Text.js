import Phaser from "phaser";

export default class Instruction extends Phaser.GameObjects.Text {
  constructor(scene, x, y, text, style) {
    // Set our default style here, and allow the passed in style parameter to overwrite any of these
    style = style ? style : {};
    style.fontSize = style.fontSize ? style.fontSize : "16px";
    style.fontFamily = style.fontFamily ? style.fontFamily : '"Press Start 2P"';
    style.align = style.align ? style.align : "center";
    style.fill = style.fill ? style.fill : "#ffffff";
    style.padding = style.padding ? style.padding : { x: 1, y: 1 };
    style.backgroundColor = style.backgroundColor
      ? style.backgroundColor
      : "transparent";

    super(scene, x, y, text, style);

    this.scene = scene;
    scene.add.existing(this);

    this.setOrigin(0.5, 0)
      .setScrollFactor(0)
      .setResolution(3) // Makes text more crisp
      .setScale(0.5) // Makes text more crisp
      .setDepth(100);
  }
}
