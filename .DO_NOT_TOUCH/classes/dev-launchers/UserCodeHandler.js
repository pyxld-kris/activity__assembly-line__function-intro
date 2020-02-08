import Phaser from "phaser";

export default class UserCodeHandler {
  constructor(context, userCode, callback) {
    this.context = context;
    this.userCode = userCode;
    this.callback = callback;

    this.executeCode();
  }

  // Used to be 'loadCode()' - refactoring
  executeCode() {
    evalWithinContext(this.context, this.userCode);
    this.callback();
    /*
    let codeText = fetch(this.path)
      .then(response => {
        return response.text();
      })
      .then(textString => {
        let modifiedActivityCode = this.parseCode(textString);
        evalWithinContext(this.context, modifiedActivityCode);
        this.callback();
      });
      */
  }
  parseCode(codeString) {
    return codeString;
  }

  destroy() {
    this.destroyFunc();
  }
}

/*
 * evalWithinContext()
 * Allows a string of javascript code to be executed within the given scope/context
 * Used after fetching student code in order to run it within the current Phaser scene
 *     (Keeps student coding interface clean)
 */
var evalWithinContext = function(context, code) {
  (function(code) {
    eval(code);
  }.apply(context, [code]));
};

function injectIntoModifiedActivityCode(modifiedActivityCode) {
  /*
  let parts = modifiedActivityCode.split('');
  var res = str.replace(/blue|house|car/gi, function (x) {
    return x.toUpperCase();
  });
  */

  modifiedActivityCode = modifiedActivityCode.replace(
    "function(array)",
    "function*(array)"
  );

  let forParts = modifiedActivityCode.split("for");
  for (let i = 1; i < forParts.length; i++) {
    let rightSideString = forParts[i];
    if (
      rightSideString.charAt(0) == "(" ||
      rightSideString.charAt(1) == "(" ||
      rightSideString.charAt(2) == "("
    ) {
      let semiColonParts = rightSideString.split(";");
      semiColonParts[2] = " yield " + semiColonParts[2];
      forParts[i] = semiColonParts.join(";");
    }
  }

  modifiedActivityCode = forParts.join("for");

  console.log(modifiedActivityCode);

  return modifiedActivityCode;
}

function loadModifyCode(scene) {
  //loadScriptWithinContext("../modify.mjs", scene);
  const modifiedCode = require("!!raw-loader!../modify.js");
  evalWithinContext(scene, modifiedCode);
}
