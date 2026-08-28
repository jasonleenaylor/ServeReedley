const aws = require("aws-sdk");
const ses = new aws.SES();
const { getFromAddress, getRecipientEmails } = require("./emailRecipients");
const {
  resolveCoordinatorEmailsForNeedTypes,
} = require("./resolveCoordinatorsForNeedTypes");

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

function parseNeedTypes(needTypesAttr) {
  if (!needTypesAttr || !needTypesAttr.L) {
    return [];
  }
  return needTypesAttr.L.map((x) => x.S).filter(Boolean);
}

function formatNeedTypesList(needTypes) {
  return needTypes.map((x) => prettyNeedTypes[x] || x).join(", ");
}

async function sendEmail({ toAddresses, fromAddress, subject, body }) {
  if (!toAddresses.length) {
    console.warn(`Skipping email "${subject}": no recipients`);
    return;
  }
  await ses
    .sendEmail({
      Destination: { ToAddresses: toAddresses },
      Source: fromAddress,
      Message: {
        Subject: { Data: subject },
        Body: { Text: { Data: body } },
      },
    })
    .promise();
  console.log(
    `Email sent: subject="${subject}" recipientCount=${toAddresses.length}`
  );
}

async function handleInsert(streamedItem) {
  const requestId = streamedItem.dynamodb.NewImage.id.S;
  const firstName = streamedItem.dynamodb.NewImage.firstName.S;
  const lastName = streamedItem.dynamodb.NewImage.lastName.S;
  const needTypes = parseNeedTypes(streamedItem.dynamodb.NewImage.needTypes);
  const spanishInfo = streamedItem.dynamodb.NewImage.spanishOnly?.BOOL
    ? "They filled out the form in Spanish"
    : "";

  const [toAddresses, fromAddress] = await Promise.all([
    getRecipientEmails("NEW_REQUEST"),
    getFromAddress(),
  ]);

  const body = `${firstName} ${lastName} needs some help with ${formatNeedTypesList(needTypes)}
${spanishInfo}
View this and other requests https://crn.servereedley.org/requests${
    requestId ? "?id=" + requestId : ""
  }`;

  await sendEmail({
    toAddresses,
    fromAddress,
    subject: `Serve Reedley: New Need for ${firstName} ${lastName}`,
    body,
  });
}

async function handleModify(streamedItem) {
  const oldStatus = streamedItem.dynamodb.OldImage?.status?.S;
  const newStatus = streamedItem.dynamodb.NewImage?.status?.S;
  if (oldStatus === "VETTED" || newStatus !== "VETTED") {
    return;
  }

  const requestId = streamedItem.dynamodb.NewImage.id.S;
  const firstName = streamedItem.dynamodb.NewImage.firstName.S;
  const lastName = streamedItem.dynamodb.NewImage.lastName.S;
  const needTypes = parseNeedTypes(streamedItem.dynamodb.NewImage.needTypes);

  const [toAddresses, fromAddress] = await Promise.all([
    resolveCoordinatorEmailsForNeedTypes(needTypes),
    getFromAddress(),
  ]);

  const body = `A request has been vetted and is ready for coordination.

${firstName} ${lastName} needs help with ${formatNeedTypesList(needTypes)}

View this and other requests https://crn.servereedley.org/requests${
    requestId ? "?id=" + requestId : ""
  }`;

  await sendEmail({
    toAddresses,
    fromAddress,
    subject: `Serve Reedley: Vetted request for ${firstName} ${lastName}`,
    body,
  });
}

exports.handler = async (event) => {
  for (const streamedItem of event.Records) {
    try {
      if (streamedItem.eventName === "INSERT") {
        await handleInsert(streamedItem);
      } else if (streamedItem.eventName === "MODIFY") {
        await handleModify(streamedItem);
      }
    } catch (error) {
      console.error("Error processing request notification:", error);
    }
  }
  return { status: "done" };
};
