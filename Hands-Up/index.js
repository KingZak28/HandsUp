"use strict";
const Alexa = require("ask-sdk-v1adapter");
const AWS = require("aws-sdk");
const APP_ID = process.env.APP_ID;
const langFileEn = require("./LanguageFiles/lang");

const langFile = {
  // Plan to support more languages
  "en-CA": {
    translation: langFileEn
  },
  "en-US": {
    translation: langFileEn
  }
};

const LaunchRequest = require("./Intents/AMAZON/launchRequest");
const Cancel = require("./Intents/AMAZON/cancel");
const Help = require("./Intents/AMAZON/help");
const Stop = require("./Intents/AMAZON/stop");
const Repeat = require("./Intents/AMAZON/repeat");
const FindPrayer = require("./Intents/PrayerIntent/findPrayer");
const FallbackIntent = require("./Intents/AMAZON/fallback");

const handlers = {
  LaunchRequest: LaunchRequest,
  findPrayer: FindPrayer,
  "AMAZON.HelpIntent": Help,
  "AMAZON.CancelIntent": Cancel,
  "AMAZON.StopIntent": Stop,
  "AMAZON.RepeatIntent": Repeat,
  "AMAZON.FallbackIntent": FallbackIntent
};

const SessionEndedRequestHandler = {
  //v2 handler added because exit was going to unhandled previously
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "SessionEndedRequest";
  },
  handle(handlerInput) {
    //any cleanup logic goes here
    return handlerInput.responseBuilder.getResponse();
  }
};
exports.handler = function(event, context, callback) {
  const alexa = Alexa.handler(event, context, callback);
  alexa.appId = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.registerV2Handlers(SessionEndedRequestHandler);
  alexa.resources = langFile;
  alexa.execute();
};
