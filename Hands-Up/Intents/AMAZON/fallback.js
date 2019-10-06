'use strict';
let speechOutput;
var randomize = require('./../../Helpers/randomizeSpeech');

module.exports = function(){
  console.log("In FallbackIntent");

  speechOutput = randomize(this.t("FallbackPrefix")) + this.t("Fallback");
  reprompt = randomize(this.t('Reprompts')) + speechOutput;
  this.emit(":ask",speechOutput,reprompt);
  console.log("Speech output should be: " + speechOutput);



};
