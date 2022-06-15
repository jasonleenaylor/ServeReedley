const aws = require("aws-sdk");
const ses = new aws.SES();
const docClient = new aws.DynamoDB.DocumentClient();

const params = {
  TableName: "Request",
  IndexName: "requestsByDate",
  KeyConditionExpression: "#status = :v_new_status",
  ExpressionAttributeNames: { "#status": "status" },
  ExpressionAttributeValues: { ":v_new_status": { S: "NEW" } },
  ProjectionExpression: "#status, createdAt",
  ScanIndexForward: false,
};

async function listItems() {
  try {
    const data = await docClient.query(params).promise();
    return data;
  } catch (err) {
    return err;
  }
}

exports.handler = async (event, context) => {
  //eslint-disable-line
  console.log(JSON.stringify(event, null, 2));
  let dbItems = await listItems();
  console.log(JSON.stringify(dbItems).substring(0, 1000));
  console.log("Test complete.");
  return Promise.resolve("Successfully processed DynamoDB record");
};
