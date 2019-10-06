'use strict';
var AWS = require('aws-sdk');
var params = {
  TableName : 'handsup',
  Key : {
    "Feeling": "Happy",
    "DuaIndex" : 1
  }
};
module.exports = function(array) {
  var docClient = new AWS.DynamoDB.DocumentClient();
  console.log("Heading to dynamo table");
  docClient.get(params, (err, data) => {
      if (err) {
          console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
          console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
          console.log("Dua is from table: " + data.Item.Dua);
          callback(data.Item.Dua);
        }
    }
};
