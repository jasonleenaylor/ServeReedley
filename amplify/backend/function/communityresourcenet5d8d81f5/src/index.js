const aws = require("aws-sdk");
const ses = new aws.SES();

exports.handler = async (event) => {
  for (const streamedItem of event.Records) {
    if (streamedItem.eventName === "INSERT") {
      //pull off items from stream
      const firstName = streamedItem.dynamodb.NewImage.firstName.S;
      const lastName = streamedItem.dynamodb.NewImage.lastName.S;
      const needTypes = streamedItem.dynamodb.NewImage.needTypes.L;

      await ses
        .sendEmail({
          Destination: {
            ToAddresses: [process.env.SES_EMAIL],
          },
          Source: process.env.SES_EMAIL,
          Message: {
            Subject: { Data: "Serve Reedley: New Need Submitted" },
            Body: {
              Text: {
                Data: `${firstName} ${lastName} needs some help with ${
                  needTypes
                    ? needTypes.map((x) => x.S).join()
                    : JSON.stringify(streamedItem.dynamodb.NewImage.needTypes)
                }`,
              },
            },
          },
        })
        .promise();
    }
  }
  return { status: "done" };
};
