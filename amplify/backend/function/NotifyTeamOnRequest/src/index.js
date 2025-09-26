const aws = require("aws-sdk");
const ses = new aws.SES();
const dynamodb = new aws.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  for (const streamedItem of event.Records) {
    if (streamedItem.eventName === "INSERT") {
      try {
        // Get team request information from the stream
        const teamRequestId = streamedItem.dynamodb.NewImage.id.S;
        const teamId = streamedItem.dynamodb.NewImage.teamID.S;
        const requestId = streamedItem.dynamodb.NewImage.requestID.S;
        const askDate = streamedItem.dynamodb.NewImage.askDate.S;
        const note = streamedItem.dynamodb.NewImage.note.S;
        
        // Get team information to get the email address
        const teamParams = {
          TableName: process.env.API_CRN_TEAMTABLE_NAME,
          Key: { id: teamId }
        };
        
        const teamResult = await dynamodb.get(teamParams).promise();
        if (!teamResult.Item || !teamResult.Item.email) {
          console.log('No team found or no email address for team:', teamId);
          continue;
        }
        
        const team = teamResult.Item;
        
        // Get request information
        const requestParams = {
          TableName: process.env.API_CRN_REQUESTTABLE_NAME,
          Key: { id: requestId }
        };
        
        const requestResult = await dynamodb.get(requestParams).promise();
        if (!requestResult.Item) {
          console.log('No request found for:', requestId);
          continue;
        }
        
        const request = requestResult.Item;
        
        // Get email configuration from secrets manager
        const vault = new aws.SecretsManager({ region: "us-west-1" });
        const secretInfo = await vault
          .getSecretValue({ SecretId: "request-email-info" })
          .promise();
        const emailInfo = JSON.parse(secretInfo.SecretString);
        
        // Map need types to readable strings
        const prettyNeedTypes = {
          MEALS: "Meals",
          GROCERIES: "Groceries", 
          MOVING: "Moving",
          JOBTRAINING: "Job Training",
          HOMEREPAIR: "Home Repair/Maintenance",
          CARREPAIR: "Car Repair/Maintenance",
          HOUSING: "Housing",
          HOUSEHOLDITEMS: "Household Items",
          HYGENEITEMS: "Personal Hygiene/Toiletries",
          CLOTHING: "Clothing",
          FURNITURE: "Furniture",
          OTHER: "Other",
        };
        
        // Send email to the team
        const subject = `Serve Reedley: New Team Request for ${team.teamName}`;
        const body = `Hello ${team.teamName} team,

You have a new request that needs attention:

Request Details:
- Name: ${request.firstName} ${request.lastName}
- Need Type: ${prettyNeedTypes[team.teamType] || team.teamType}
- Request Date: ${new Date(request.dateOfRequest).toDateString()}
- Ask Date: ${new Date(askDate).toDateString()}
- City: ${request.city}
${request.phone ? `- Phone: ${request.phone}` : ''}
${request.email ? `- Email: ${request.email}` : ''}

${note ? `Team Coordinator Note: ${note}` : ''}

Please review this request and coordinate with your team to provide assistance.

View this and other requests: https://crn.servereedley.org/requests${requestId ? "?id=" + requestId : ""}

Thank you for serving our community!

Serve Reedley Team`;

        await ses
          .sendEmail({
            Destination: {
              ToAddresses: [team.email],
            },
            Source: emailInfo.fromAddress,
            Message: {
              Subject: {
                Data: subject,
              },
              Body: {
                Text: {
                  Data: body,
                },
              },
            },
          })
          .promise();
          
        console.log(`Email sent to team ${team.teamName} at ${team.email} for request ${requestId}`);
        
      } catch (error) {
        console.error('Error processing team request notification:', error);
        // Continue processing other records even if one fails
      }
    }
  }
  return { status: "done" };
};