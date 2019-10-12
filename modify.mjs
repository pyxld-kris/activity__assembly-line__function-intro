/**** WELCOME! *********************************************/
/**
 * Sort the steps to allow your character to reach the goal!
 * 
 * 
 * ----------------------------------------------------------
 * After making a change: save this file, then press the refresh
 * button above the game window!
 * ----------------------------------------------------------
 */

/**************** Start Modifying Here! *********************/


this.sortStairs = function(array) {

  // Finish the incomplete sorting algorithm!
  for (let i=0; i<array.length; i++) {
    swapElements(i, i-1);
  }

}

/**** GOODBYE! ************************************************/
/**** Stop Modifying Here! (Unless you want to experiment!) ***/

/* */
/*/
/*/
/*/
/*/
/*/
/*/
/*/
/*/
/*/
/* */

var scene = this;
function swapElements(indexA, indexB) {
  if (indexA<0 || indexB<0 || indexA >=scene.stageArray.length || indexB >=scene.stageArray.length)
    return;
  // Swap the integers in stageArray
  let temp = scene.stageArray[indexA];
  scene.stageArray[indexA] = scene.stageArray[indexB];
  scene.stageArray[indexB] = temp;

  return 1;
}

/* eslint-disable */ // Stops codesandbox from giving us annoying errors

