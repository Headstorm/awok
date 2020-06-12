// Create clients and set shared const values outside of the handler.

// Create a DocumentClient that represents the query to add an item
const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();

// Get the DynamoDB table name from environment variables
const tableName = process.env.RESERVATIONS_TABLE_NAME;

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

  headers["Access-Control-Allow-Origin"] = "*";
  try {
    switch (event.httpMethod) {
      case "DELETE":
				body = await docClient
				  .delete({ TableName: 'Reservation', Key: { Code: event.queryStringParameters.code, resDate: new Date().toISOString().substring(0,10) }})
					.promise()
        break;
      case "POST":
        // Get id and name from the body of the request
        body = JSON.parse(event.body);
        const {
          reservationCode,
          dates
        } = body;

        let batchDates = [];

        dates.forEach(date => {
          batchDates.push({
            PutRequest: {
              Item: {
                "Code": reservationCode,
                "resDate": date
              }
            }
          })
        })

        let params = {
          RequestItems: {
            [tableName]: batchDates
          }
        }

        await docClient
          .batchWrite(params, (err, data) => {
            if(err) { console.log(err) }
            else { console.log(data) }
          })
          .promise()
        break;
      case "GET":
				var searchRes = {
          TableName : tableName,
          FilterExpression : 'Code = :code',
          ExpressionAttributeValues : {':code' : event.pathParameters.Code }
        };
                
        const reservationsToday = await docClient.scan(searchRes).promise();

        body = reservationsToday.Items;
        break;
      default:
        throw new Error(`Unsupported method "${event.httpMethod}"`);
    }
  } catch (err) {
    statusCode = "400";
    body = err.message + '' + err;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};
