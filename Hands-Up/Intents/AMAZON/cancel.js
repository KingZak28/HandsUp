'use strict';
var randomize = require('./../../Helpers/randomizeSpeech');
let speechOutput;
let reprompt;

module.exports = function(){
  console.log("In Cancel intent");
  speechOutput = randomize(this.t("ExitPrefix")) + this.t("Exit");
  reprompt = randomize(this.t('Reprompts')) + speechOutput;
  this.emit(":tell",speechOutput,reprompt);

  console.log("Finished Cancel");
};
