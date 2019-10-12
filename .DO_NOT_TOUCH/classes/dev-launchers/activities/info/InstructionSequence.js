import Phaser from "phaser";

export default class InstructionHandler {
  constructor(scene, instructionCollection) {
    this.scene = scene;

    this.instructionCollection = instructionCollection;
    this.instructionIndex = 0;

    this.displayNextInstruction();
  }

  displayNextInstruction() {
    if (this.instructionIndex < this.instructionCollection.length) {
      let instruction = this.instructionCollection[this.instructionIndex];
      let displayDuration = instruction.displayDuration;

      instruction.display();
      this.instructionIndex++;

      this.scene.time.addEvent({
        delay: displayDuration, // ms
        callback: () => {
          this.displayNextInstruction();
        }
      });
    }
  }
}
