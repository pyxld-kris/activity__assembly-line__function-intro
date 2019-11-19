import Phaser from "phaser";
import DevLaunchers from "./classes/dev-launchers";
import Activity from "./classes/dev-launchers/Activity.js";
import ActivitySequence from "./classes/dev-launchers/ActivitySequence.js";
import UserCodeHandler from "./classes/dev-launchers/UserCodeHandler.js";

import PlayerCharacter from "./classes/PlayerCharacter.js";
import FunctionStation from "./classes/FunctionStation.js";
import LaserScanner from "./classes/LaserScanner.js";
import Package from "./classes/Package.js";
import PackageProducer from "./classes/PackageProducer.js";
import CenteredTimedText from "./classes/CenteredTimedText.js";
import CountdownTimer from "./classes/CountdownTimer.js";

import Activity1 from "./activities/Activity1.js";
import Activity2 from "./activities/Activity2.js";
import Activity3 from "./activities/Activity3.js";

// Load specific game stuff here that will be used in
// this file, or in 'modify.mjs'

/* Lift classes to global scope */
(function() {
  // We have to lift classes we need access to into the
  //   global scope (stupid module scoping issue)
  // This is done so students can code in a clean script file (without
  //    having to use imports/exports, etc.)
  //
  // ie. window.Animal = Animal;
})();

export function setupActivity(scene) {
  /* Any pre setup code (additional from the game code) or
   * scene injection code needed to run this activity
   * should be executed here */
  scene.activitySequence = new ActivitySequence([
    new Activity1(scene),
    new Activity2(scene),
    new Activity3(scene)
  ]);

  var currentStage = localStorage.getItem("stage");

  scene.events.on("stage-complete", () => {
    scene.activitySequence.nextActivity();
  });
}
