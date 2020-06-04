// Create clients and set shared const values outside of the handler.

// Create a DocumentClient that represents the query to add an item
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

// Get the DynamoDB table name from environment variables
const tableName = process.env.EMPLOYEE_TABLE_NAME;

/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */
exports.handler = async (event, context) => {

  let body;
  let statusCode = '200';
  const headers = {
    'Content-Type': 'application/json',
  };

  const key = new Date().toDateString();
  let dbItem = (await docClient.get({ TableName: tableName, Key: { Date: key } }).promise());
  const isItemNull = Object.keys(dbItem).length === 0;

  const createTodaysCount = async () => {
    return (await docClient.put({ TableName: tableName, Item: { Date: key, positiveCount: 0, negativeCount: 0 } }).promise())
  }

  if (isItemNull) {
    createTodaysCount();
    dbItem = { Date: key, positiveCount: 0, negativeCount: 0 };
  } else {
    dbItem = dbItem.Item;
  }

  headers['Access-Control-Allow-Origin'] = '*'
  try {
    switch (event.httpMethod) {
      case 'DELETE':
        body = await docClient.delete({ TableName: tableName, Key: { Date: key } }).promise();
        createTodaysCount();
        break;
      case 'GET':
        body = dbItem;
        break;
      case 'PATCH':
        const positiveDelta = event.queryStringParameters.TestedPositive.toLowerCase() === 'true' ? 1 : 0;
        const positiveCount = dbItem.positiveCount + positiveDelta;
        const negativeCount = dbItem.negativeCount + (1 - positiveDelta);
        const Item = { Date: key, positiveCount, negativeCount };
        await docClient.put({
          TableName: tableName,
          Item,
        }).promise()
        body = Item;
        break;
      // headers['Access-Control-Allow-Origin'] = 
      // case 'PUT':
      //     body = await docClient.put({
      //         TableName: tableName,
      //         // "Key": {
      //         //     Date: new Date().toDateString(),
      //         // },
      //         Item: {Date: new Date().toDateString(), ...Item}
      //     }).promise();
      //     break;
      default:
        throw new Error(`Unsupported method "${event.httpMethod}"`);
    }
  }
  catch (err) {
    statusCode = '400';
    body = err.message;
  }
  finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};
