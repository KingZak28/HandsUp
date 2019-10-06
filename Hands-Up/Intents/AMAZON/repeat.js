'use strict';
var randomize = require('./../../Helpers/randomizeSpeech');
let speechOutput;
let reprompt;

module.exports = function(){
  console.log("In Repeat");
  var session = this.attributes;

  speechOutput = randomize(this.t("Repeat")) + session.repeatMessage;
  reprompt = randomize(this.t("Repeat")) + session.repeatMessage;
  this.emit(":ask",speechOutput,reprompt);

  console.log("Exiting Repeat");
};
