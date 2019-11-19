import Phaser from "phaser";

export default class ActivitySequence {
  constructor(activities) {
    this.activities = activities;

    this.nextActivity();
  }

  nextActivity() {
    if (this.currentActivity) {
      this.currentActivity.destroy();
    }
    if (this.activities.length > 0) {
      this.currentActivity = this.activities.shift();
      this.currentActivity.init();
    } else {
      alert("WIN!");
    }
  }

  destroy() {
    // Destroy all activities in this sequence
    for (var i = 0; i < this.activities.length; i++) {
      this.activities[i].destroy();
    }
  }
}
