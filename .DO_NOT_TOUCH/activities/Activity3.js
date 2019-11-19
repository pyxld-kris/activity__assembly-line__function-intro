import DevLaunchers from "../classes/dev-launchers";
import Activity from "../classes/dev-launchers/Activity.js";
import UserCodeHandler from "../classes/dev-launchers/UserCodeHandler.js";

import PlayerCharacter from "../classes/PlayerCharacter.js";
import FunctionStation from "../classes/FunctionStation.js";
import LaserScanner from "../classes/LaserScanner.js";
import Package from "../classes/Package.js";
import PackageProducer from "../classes/PackageProducer.js";
import CenteredTimedText from "../classes/CenteredTimedText.js";
import CountdownTimer from "../classes/CountdownTimer.js";

import Text from "../classes/dev-launchers/activities/info/Text.js";

const STAGE_NUM = 3;

export default class Activity3 extends Activity {
  constructor(scene) {
    // Function called when this activity is initialized
    var initFunc = () => {
      localStorage.setItem("stage", STAGE_NUM);
      scene.stageTitle = new Text(scene, 40, 10, "Stage " + STAGE_NUM, {
        fill: "#ffffff"
      });

      let gameWidth = scene.game.config.width;
      let gameHeight = scene.game.config.height;
      let halfGameWidth = gameWidth / 2;
      let halfGameHeight = gameHeight / 2;

      new CenteredTimedText(
        scene,
        "Functions\nStage " + STAGE_NUM,
        {},
        1500,
        () => {
          // Create assembly line conveyor belt
          scene.add.rectangle(
            halfGameWidth,
            gameHeight - 50,
            gameWidth,
            20,
            0x222222
          );
          scene.add.rectangle(
            halfGameWidth,
            gameHeight - 50,
            gameWidth,
            12,
            0x333333
          );
          scene.add.circle(halfGameWidth, gameHeight - 50, 6, 0x111111);
          scene.add.circle(halfGameWidth / 3, gameHeight - 50, 6, 0x111111);
          scene.add.circle(
            halfGameWidth + (halfGameWidth / 3) * 2,
            gameHeight - 50,
            6,
            0x111111
          );

          // Now load the modify code, and then continue activity setup afterward in the callback
          new UserCodeHandler(scene, "/activity3.mjs", () => {
            //scene.countdownTimer = new CountdownTimer(scene, 15);

            scene.player = new PlayerCharacter(scene, 10, 10);
            scene.physics.add.collider(scene.player, scene.platformColliders);
            scene.physics.add.collider(scene.player, scene.ground);
            scene.physics.add.collider(scene.player, scene.goal, () => {
              new DevLaunchers.Activities.Success.Noise(scene);
              new DevLaunchers.Activities.Info.Text(
                scene,
                halfGameWidth,
                10,
                "You did it!",
                { fontSize: "32px" }
              );
            });

            // Add function1 box
            scene.functionStation1 = new FunctionStation(
              scene,
              halfGameWidth - halfGameWidth / 3 - 15,
              gameHeight - 88,
              60,
              60,
              "function1",
              () => {
                scene.package.setContents(
                  scene.function1(scene.package.contents)
                );
              }
            );

            // Add function2 box
            scene.functionStation2 = new FunctionStation(
              scene,
              halfGameWidth + halfGameWidth / 3 + 15,
              gameHeight - 88,
              60,
              60,
              "function2",
              () => {
                scene.package.setContents(
                  scene.function2(scene.package.contents)
                );
              }
            );

            scene.packageProducer = new PackageProducer(
              scene,
              25,
              gameHeight - 85,
              [2, 1, 3]
            );

            scene.laserScanner1 = new LaserScanner(scene, halfGameWidth, 25, [
              8,
              4,
              12
            ]);
            scene.laserScanner2 = new LaserScanner(
              scene,
              halfGameWidth + parseInt(halfGameWidth / 1.25),
              25,
              [4, 2, 6]
            );

            // Now we have to check our win condition
            scene.events.on("package-destroyed", () => {
              if (
                scene.packageProducer.isComplete() &&
                scene.laserScanner1.isComplete() &&
                scene.laserScanner2.isComplete()
              ) {
                scene.events.emit("stage-complete");
              }
            });
          });
        }
      );
    };

    // Function called when this activity is destroyed
    var destroyFunc = () => {
      scene.events.off("package-destroyed");
      scene.functionStation1.destroy();
      scene.functionStation2.destroy();
      scene.packageProducer.destroy();
      scene.laserScanner1.destroy();
      scene.laserScanner2.destroy();

      scene.stageTitle.destroy();
    };

    super(scene, initFunc, destroyFunc);
  }
}
