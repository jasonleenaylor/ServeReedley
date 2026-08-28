const aws = require("aws-sdk");
const ses = new aws.SES();
const docClient = new aws.DynamoDB.DocumentClient();
const { getFromAddress, getRecipientEmails } = require("./emailRecipients");

const prettyNeedTypes = {
  MEALS: "Meals",
  GROCERIES: "Groceries",
  MOVING: "Moving",
  JOBTRAINING: "Job Training",
  HOMEREPAIR: "Home Repair/Maintenance",
  CARREPAIR: "Car Repair/Maintenance",
  HOUSING: "Housing",
  HOUSEHOLDITEMS: "Household Items",
  HYGENEITEMS: "Personal Hygene/Toiletries",
  CLOTHING: "Clothing",
  FURNITURE: "Furniture",
  OTHER: "Other",
};

async function listStaleNewRequests() {
  const tableName = process.env.API_CRN_REQUESTTABLE_NAME;
  if (!tableName) {
    throw new Error("API_CRN_REQUESTTABLE_NAME is not set");
  }

  const d = new Date();
  d.setDate(d.getDate() - 7);

  const params = {
    TableName: tableName,
    IndexName: "requestsByDate",
    KeyConditionExpression:
      "#status = :v_new_status AND createdAt < :v_seven_days_old",
    ExpressionAttributeNames: { "#status": "status" },
    ExpressionAttributeValues: {
      ":v_new_status": "NEW",
      ":v_seven_days_old": d.toISOString(),
    },
    ProjectionExpression: [
      "id",
      "createdAt",
      "#status",
      "firstName",
      "lastName",
      "needTypes",
    ].join(", "),
    ScanIndexForward: false,
  };

  try {
    const data = await docClient.query(params).promise();
    return data;
  } catch (err) {
    console.error("Error querying stale NEW requests:", err);
    throw err;
  }
}

exports.handler = async () => {
  const dbItems = await listStaleNewRequests();
  if (!dbItems.Count || dbItems.Count === 0) {
    return Promise.resolve("No stale NEW requests");
  }

  const reminderMessages = dbItems.Items.map((request) => {
    const needList = (request.needTypes || [])
      .map((x) => prettyNeedTypes[x] || x)
      .join(", ");
    return (
      `${request.firstName} ${request.lastName} asked for help with ${needList} on ${new Date(request.createdAt).toDateString()}: https://crn.servereedley.org/requests` +
      (request.id ? `?id=${request.id}` : "") +
      "\r\n\r\n"
    );
  });

  const [toAddresses, fromAddress] = await Promise.all([
    getRecipientEmails("STALE_REQUEST_REMINDER"),
    getFromAddress(),
  ]);

  if (!toAddresses.length) {
    console.warn("Skipping stale request reminder: no recipients configured");
    return Promise.resolve("No recipients configured");
  }

  await ses
    .sendEmail({
      Destination: { ToAddresses: toAddresses },
      Source: fromAddress,
      Message: {
        Subject: {
          Data: `Serve Reedley: Incomplete needs on ${new Date().toDateString()}`,
        },
        Body: {
          Text: {
            Data: `${reminderMessages.join("")}
View these and other requests https://crn.servereedley.org/requests`,
          },
        },
      },
    })
    .promise();

  console.log(
    `Stale request reminder sent: recipientCount=${toAddresses.length} requestCount=${dbItems.Count}`
  );

  return Promise.resolve("Successfully processed DynamoDB record");
};
