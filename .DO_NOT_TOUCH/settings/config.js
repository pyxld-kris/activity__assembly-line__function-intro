import Phaser from "phaser";
import PlayScene from "../scenes/PlayScene.js";

export var config = {
  type: Phaser.AUTO,
  width: 200 * 2,
  height: 120 * 2,
  parent: "game-container",
  pixelArt: true,
  autoRound: false,
  backgroundColor: "#555555",
  scene: PlayScene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1500 }
    }
  }
};
