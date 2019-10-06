"use strict";
var randomize = require("./../../Helpers/randomizeSpeech");
var AWS = require("aws-sdk");
var params = process.env.PARAMS;
let speechOutput;
let reprompt;
let index;
let feeling;
let stringObject;
var dua;
let slotFeeling;
let filledSlots;
let count;
let found;

module.exports = function() {
  console.log("In findPrayer");
  var session = this.attributes;
  count = 0;
  found = false;
  // Check if feeling is undefined
  let filledSlots = this.event.request.intent.slots;
  console.log("json is %j", filledSlots);
  while (found != true) {
    count++;
    console.log("value of count is: ", count);
    if (
      filledSlots.Feeling &&
      filledSlots.Feeling.resolutions &&
      filledSlots.Feeling.resolutions.resolutionsPerAuthority[0] &&
      filledSlots.Feeling.resolutions.resolutionsPerAuthority[0].values[0]
    ) {
      console.log("in not undefined part");
      console.log(
        "inside loop json %j",
        filledSlots.Feeling.resolutions.resolutionsPerAuthority[0].values[0]
      );
      //console.log("Feeling temp is: " + temp);
      feeling =
        filledSlots.Feeling.resolutions.resolutionsPerAuthority[0].values[0]
          .value.name;
      index = Math.floor(Math.random() * 3) + 1; // Curently only have three Dua's per feeling in table

      console.log("the feeling was " + feeling + " and the index was " + index);
      found = true;
      params.Key.Feeling = feeling;
      params.Key.DuaIndex = index;

      readDynamoItem(params, "Dua", myResult => {
        dua = myResult;
        console.log("The dua is: " + dua);
        speechOutput =
          this.t("PrayerResponse") + randomize(this.t("PostPrayerSuffix"));
        speechOutput = speechOutput
          .replace(/prayerSlot/gi, dua)
          .replace(/feelingSlot/gi, feeling);

        console.log("the speechOutput was: " + speechOutput);
        session.repeatMessage = speechOutput;
        reprompt = randomize(this.t("Reprompts")) + speechOutput;

        this.emit(":ask", speechOutput, reprompt);
      });
    } else if (count < 3) {
      speechOutput = randomize(this.t("FeelingSlotReprompt"));
      reprompt = randomize(this.t("Reprompts")) + speechOutput;
      this.emit(":ask", speechOutput, reprompt);
    } else {
      speechOutput = this.t("TroubleEncountered");
      this.emit(":tell", speechOutput);
      break;
    }
  }

  console.log("Ending findPrayer");

  function readDynamoItem(params, column, callback) {
    var docClient = new AWS.DynamoDB.DocumentClient();
    console.log("Heading to dynamo table");
    docClient.get(params, (err, data) => {
      if (err) {
        console.error(
          "Unable to read item. Error JSON:",
          JSON.stringify(err, null, 2)
        );
      } else {
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
        console.log("Dua is from table: " + data.Item.Dua);
        callback(data.Item.Dua);
      }
    });
  }
};
