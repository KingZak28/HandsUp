'use strict';
var randomize = require('./../../Helpers/randomizeSpeech');
let speechOutput;
let reprompt;

module.exports = function(){
  console.log("In help");
  var session = this.attributes;
  speechOutput = this.t("Help");
  session.repeatMessage = speechOutput;
  reprompt = randomize(this.t('Reprompts')) + speechOutput;
  this.emit(":ask",speechOutput,reprompt);
  console.log("Exiting help");
};
