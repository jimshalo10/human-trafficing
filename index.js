const ApiBuilder = require('claudia-api-builder'),
    AWS = require('aws-sdk');
var api = new ApiBuilder(),
    dynamoDb = new AWS.DynamoDB.DocumentClient();

api.post('/humantraffic', function (request) { // SAVE your humantraffic
  var params = {  
    TableName: 'humantraffic',  
    Item: {
        humantrafficid: request.body.humantrafficId,
        name: request.body.name // your humantraffic name
    } 
  }
  return dynamoDb.put(params).promise(); // returns dynamo result 
}, { success: 201 }); // returns HTTP status 201 - Created if successful

api.get('/humantraffic', function (request) { // GET all users
  return dynamoDb.scan({ TableName: 'humantraffic' }).promise()
      .then(response => response.Items)
});

module.exports = api;
