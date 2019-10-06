'use strict';
var randomize = require('./../../Helpers/randomizeSpeech');
let speechOutput;
let reprompt;

module.exports = function(){
  console.log("LR Entered ");
  var session = this.attributes;

  const speechOutput = this.t('Welcome')
  session.repeatMessage = speechOutput; // The message to be repeated if repeat is invoked.
  const reprompt = randomize(this.t('Reprompts')) + speechOutput;
  this.emit(':ask', speechOutput,reprompt);

  console.log("LR Finished");
};
