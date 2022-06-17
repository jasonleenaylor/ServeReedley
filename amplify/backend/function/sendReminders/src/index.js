const aws = require("aws-sdk");
const ses = new aws.SES();
const docClient = new aws.DynamoDB.DocumentClient();

var d = new Date();
d.setDate(d.getDate() - 7);

const params = {
  TableName: "Request-2ytqsqa7mjczhid7bkitt6vnsq-prod",
  IndexName: "requestsByDate",
  KeyConditionExpression:
    "#status = :v_new_status AND createdAt < :v_seven_days_old",
  ExpressionAttributeNames: { "#status": "status" },
  ExpressionAttributeValues: {
    ":v_new_status": "NEW",
    ":v_seven_days_old": d.toGMTString(),
  },
  ProjectionExpression: [
    "id",
    "createdAt",
    "#status",
    "firstName",
    "lastName",
    "needTypes",
  ],
  ScanIndexForward: false,
};

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
  let dbItems = await listItems();
  if (dbItems.Count > 0) {
    var reminderMessages = dbItems.Items.map(function (request) {
      return (
        request.firstName +
        " " +
        request.lastName +
        " asked for help with " +
        request.needTypes.map((x) => prettyNeedTypes[x]).join() +
        " on " +
        new Date(request.createdAt).toDateString() +
        "\r\n"
      );
    });
    const vault = new aws.SecretsManager({ region: "us-west-1" });
    const secretInfo = await vault
      .getSecretValue({ SecretId: "request-email-info" })
      .promise();
    const emailInfo = JSON.parse(secretInfo.SecretString);

    await ses
      .sendEmail({
        Destination: {
          ToAddresses: emailInfo.sysopAddresses.split(","),
        },
        Source: emailInfo.fromAddress,
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
  }
  return Promise.resolve("Successfully processed DynamoDB record");
};
