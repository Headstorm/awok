// Create clients and set shared const values outside of the handler.

// Create a DocumentClient that represents the query to add an item
const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();
const moment = require("moment-timezone");

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
				const deleteRes = await docClient
				.delete({ TableName: tableName, Key: { Code: event.queryStringParameters.code, resDate: new Date().toISOString().substring(0,10) }})
				.promise()
				body = { ...deleteRes, params: event.queryStringParameters }
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
				if(event.queryStringParameters && event.queryStringParameters.Code) {
					var searchRes = {
						TableName : tableName,
						FilterExpression : 'Code = :code',
						ExpressionAttributeValues : {':code' : event.queryStringParameters.Code }
					};
									
					const reservationsForCode = await docClient.scan(searchRes).promise();
	
					body = reservationsForCode.Items;
				} else {
					var searchDate = {
						TableName: tableName,
					}
					const reservations = await docClient.scan(searchDate).promise();
					const range = Array(7).fill(null).map((_, i) => i);
					const last7Keys = range.map((offset) => ( moment.tz("America/Chicago").startOf('day').subtract(offset, 'd').format().substring(0,10) ));

					const history = last7Keys.map(day => {
						const seperatedReservations = reservations.Items
							.filter(item => item.resDate === day)
							.reduce((acc, current) => {
								if(current.checkedIn === true) {
									return {
										...acc,
										reservationsCheckedIn: [...acc.reservationsCheckedIn, current]
									}
								} else {
									return {
										...acc,
										reservationsExpired: [...acc.reservationsExpired, current]
									}
								}
							}, { reservationsCheckedIn: [], reservationsExpired: [] })
						return {
							reservationsExpired: seperatedReservations.reservationsExpired.length,
							reservationsCheckedIn: seperatedReservations.reservationsCheckedIn.length,
							day
						}
					})
					
					body = { reservationHistory: history };
				}
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
