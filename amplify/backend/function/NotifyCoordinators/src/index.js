const aws = require("aws-sdk");
const ses = new aws.SES();

exports.handler = async (event) => {
  for (const streamedItem of event.Records) {
    if (streamedItem.eventName === "INSERT") {
      const vault = new aws.SecretsManager({ region: "us-west-1" });
      const secretInfo = await vault
        .getSecretValue({ SecretId: "request-email-info" })
        .promise();
      //pull off items from stream
      const firstName = streamedItem.dynamodb.NewImage.firstName.S;
      const lastName = streamedItem.dynamodb.NewImage.lastName.S;
      const needTypes = streamedItem.dynamodb.NewImage.needTypes.L;
      const emailInfo = JSON.parse(secretInfo.SecretString);
      const spanishInfo = streamedItem.dynamodb.NewImage.spanishOnly.BOOL
        ? "They filled out the form in Spanish"
        : "";
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
      await ses
        .sendEmail({
          Destination: {
            ToAddresses: emailInfo.sysopAddresses.split(","),
          },
          Source: emailInfo.fromAddress,
          Message: {
            Subject: {
              Data: `Serve Reedley: New Need for ${firstName} ${lastName}`,
            },
            Body: {
              Text: {
                Data: `${firstName} ${lastName} needs some help with ${
                  needTypes
                    ? needTypes.map((x) => prettyNeedTypes[x.S]).join()
                    : JSON.stringify(streamedItem.dynamodb.NewImage.needTypes)
                }
${spanishInfo}                
View this and other requests https://crn.servereedley.org/requests`,
              },
            },
          },
        })
        .promise();
    }
  }
  return { status: "done" };
};
