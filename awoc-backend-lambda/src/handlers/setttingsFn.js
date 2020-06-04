// Create clients and set shared const values outside of the handler.

// Create a DocumentClient that represents the query to add an item
const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();

// Get the DynamoDB table name from environment variables
const tableName = process.env.SETTINGS_TABLE_NAME;

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
      case "POST":
        // Get id and name from the body of the request
        body = JSON.parse(event.body);
        const {
          companyName,
          occupancyRule,
          currentRules,
          successMessage,
        } = body;
        await docClient
          .put({
            TableName: tableName,
            Item: {
              companyName,
              occupancyRule,
              currentRules,
              successMessage,
            },
          })
          .promise();
        break;
      case "GET":
        const data = await docClient
          .get({
            TableName: tableName,
            Key: { companyName: event.pathParameters.companyName },
          })
          .promise();

        body = data.Item;
        break;
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
