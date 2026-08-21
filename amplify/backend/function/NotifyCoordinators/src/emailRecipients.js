const aws = require("aws-sdk");
const docClient = new aws.DynamoDB.DocumentClient();

const DEFAULT_SETTINGS_ID = "default";

async function getFromAddress() {
  const tableName = process.env.API_CRN_APPEMAILSETTINGSTABLE_NAME;
  if (!tableName) {
    throw new Error("API_CRN_APPEMAILSETTINGSTABLE_NAME is not set");
  }
  const result = await docClient
    .get({
      TableName: tableName,
      Key: { id: DEFAULT_SETTINGS_ID },
    })
    .promise();
  const fromAddress = result.Item?.fromAddress;
  if (!fromAddress) {
    throw new Error(
      `AppEmailSettings record "${DEFAULT_SETTINGS_ID}" is missing or has no fromAddress`
    );
  }
  return fromAddress;
}

async function getRecipientEmails(role) {
  const tableName = process.env.API_CRN_NOTIFICATIONRECIPIENTTABLE_NAME;
  if (!tableName) {
    throw new Error("API_CRN_NOTIFICATIONRECIPIENTTABLE_NAME is not set");
  }
  const emails = [];
  let lastEvaluatedKey;
  do {
    const result = await docClient
      .query({
        TableName: tableName,
        IndexName: "byRole",
        KeyConditionExpression: "#role = :role",
        ExpressionAttributeNames: { "#role": "role" },
        ExpressionAttributeValues: { ":role": role },
        ExclusiveStartKey: lastEvaluatedKey,
      })
      .promise();
    for (const item of result.Items || []) {
      if (item.enabled && item.email) {
        emails.push(item.email);
      }
    }
    lastEvaluatedKey = result.LastEvaluatedKey;
  } while (lastEvaluatedKey);
  return [...new Set(emails)];
}

module.exports = {
  DEFAULT_SETTINGS_ID,
  getFromAddress,
  getRecipientEmails,
};
