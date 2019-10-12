/**
 * @author       Kris Gano <kris@pyxld.com>
 * @copyright    2019 Dev Launchers
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import Phaser from "phaser";

export default class CenteredTimedText extends Phaser.GameObjects.Text {
  constructor(scene, text, style, duration, callback) {
    // Set our default style here, and allow the passed in style parameter to overwrite any of these
    style = style ? style : {};
    style.fontSize = style.fontSize ? style.fontSize : "64px";
    style.fontFamily = style.fontFamily ? style.fontFamily : '"Press Start 2P"';
    style.align = style.align ? style.align : "center";
    style.fill = style.fill ? style.fill : "#ffffff";
    style.padding = style.padding ? style.padding : { x: 1, y: 1 };
    style.backgroundColor = style.backgroundColor
      ? style.backgroundColor
      : "transparent";

    super(
      scene,
      scene.game.config.width / 2,
      scene.game.config.height / 2 - 50,
      text,
      style
    );

    this.scene = scene;
    this.callback = callback;

    scene.add.existing(this);

    this.setOrigin(0.5, 0)
      .setScrollFactor(0)
      .setResolution(3) // Makes text more crisp
      .setScale(0.5) // Makes text more crisp
      .setDepth(100);

    this.scene.time.addEvent({
      delay: duration, // ms
      callback: () => {
        this.callback();
        this.destroy();
      }
    });
  }

  destroy() {
    // Call this object's parent class destroy method
    super.destroy();
  }
}
