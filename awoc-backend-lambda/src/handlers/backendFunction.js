// Create clients and set shared const values outside of the handler.

// Create a DocumentClient that represents the query to add an item
const dynamodb = require("aws-sdk/clients/dynamodb");
const moment = require("moment-timezone");

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
  let statusCode = "200";
  const headers = {
    "Content-Type": "application/json",
  };

  const today = moment.tz("America/Chicago").startOf('day');
  const Key = {
    Date: today.format(),
  }

  let dbItem = await docClient
    .get({ TableName: tableName, Key })
    .promise();
  const isItemNull = Object.keys(dbItem).length === 0;

  const createTodaysCount = async () => {
    return await docClient
      .put({
        TableName: tableName,
        Item: { ...Key, positiveCount: 0, negativeCount: 0 },
      })
      .promise();
  };

  if (isItemNull) {
    createTodaysCount();
    dbItem = { ...Key, positiveCount: 0, negativeCount: 0 };
  } else {
    dbItem = dbItem.Item;
  }

  // inserts a bunch o random data
  // const last30Keys = Array(30).fill(null).map((_, i) => i).map(offset => ({ Date: moment.tz("America/Chicago").startOf('day').subtract(offset, 'd').format() }));
  // await Promise.all(last30Keys.map(async key => {
  //   const count = Math.floor((Math.random() * (25 - 1) + 1));
  //   const positiveCount = Math.floor((Math.random() * (count - 1) + 1));
  //   const negativeCount = count - positiveCount;
  //   const Item = { ...key, positiveCount, negativeCount };
  //   await docClient
  //     .put({
  //       TableName: tableName,
  //       Item,
  //     })
  //     .promise();
  // }))


  headers["Access-Control-Allow-Origin"] = "*";
  try {
    switch (event.httpMethod) {
      case "DELETE":
        body = await docClient
          .delete({ TableName: tableName, Key })
          .promise();
        createTodaysCount();
        break;
      case "GET":
        await docClient.get({ TableName: tableName, Key }).promise();

        var searchRes = {
          TableName : 'Reservation',
          FilterExpression : 'resDate = :date',
          ExpressionAttributeValues : {':date' : new Date().toISOString().substring(0,10)}
        };
                
        const reservationsToday = await docClient.scan(searchRes).promise();

        const settings = await docClient
        .get({
          TableName: 'awocSettings',
          Key: { companyName: 'Headstorm' }
        })
        .promise();
      
        const currentTime = new Date().toString().substring(16, 18)
      
        if(settings.Item.reservationClearOut.substring(11,13) >= currentTime) {
          // get all records with date of today
          // change expired to true
          // put those back in the db
          const deleteRes = reservationsToday.map(res => {
            return {
                DeleteRequest: {
                  Key: { Code: res.Code, resDate: new Date().toISOString().substring(0,10) }
                }
              }
          })

          const deleteItems = {
            RequestItems: {
              'Reservation': deleteRes
            }
          }

          await docClient
                .batchWrite(deleteItems)
                .promise()
        }

        const range = Array(30).fill(null).map((_, i) => i);
        const last30Keys = range.map(offset => ({ Date: moment.tz("America/Chicago").startOf('day').subtract(offset, 'd').format() }));
        body = {
          today: { ...dbItem, reservationsToday: reservationsToday.Items.length },
          history: (await docClient.batchGet({
            RequestItems: {
              [tableName]: { Keys: last30Keys }
            }
          }).promise()).Responses[tableName].sort((a, b) => new Date(b.Date) - new Date(a.Date))
        };
        break;
      case "PATCH":
        const positiveDelta =
          event.queryStringParameters.TestedPositive.toLowerCase() === "true"
            ? 1
            : 0;
        const positiveCount = dbItem.positiveCount + positiveDelta;
        const negativeCount = dbItem.negativeCount + (1 - positiveDelta);
        const resCode = event.queryStringParameters.code ? event.queryStringParameters.code : null;
        if(resCode) {
          await docClient
          .delete({ TableName: 'Reservation', Key: { Code: event.queryStringParameters.code, resDate: new Date().toISOString().substring(0,10) }})
          .promise()
        }
        const Item = { ...Key, positiveCount, negativeCount };
        await docClient
          .put({
            TableName: tableName,
            Item,
          })
          .promise();
        // await docClient
        //   .delete({
        //     TableName: 'Reservations',
        //     Code: event.pathParameters.reservationCode
        //   })
        //   .promise()
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
  } catch (err) {
    statusCode = "400";
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};
