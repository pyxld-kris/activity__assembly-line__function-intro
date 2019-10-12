import Phaser from "phaser";
import { config } from "./settings/config.js";

const game = new Phaser.Game(config);

/*
 * Import and set up the specific dev launchers activity code
 * to be injected into this game (Helps keep our games and lessons
 * separate)
 */
function setupActivity() {
  var activity = require("./activity-setup.js");
  activity.setupActivity(game.scene.scenes[0]);

  game.events.off("step", setupActivity); // Remove event, so only happens once
}

// When the game is ready, begin setting up the activity
/* Only fire game step event once, so we know the scene is ready
 * (couldn't attach to 'ready' or 'create' scene events for some reason,
 * so used this hack */
game.events.on("step", setupActivity);
