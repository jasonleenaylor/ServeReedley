const aws = require("aws-sdk");
const docClient = new aws.DynamoDB.DocumentClient();

async function getCoordinatorEmail(coordinatorId) {
  const tableName = process.env.API_CRN_COORDINATORTABLE_NAME;
  if (!tableName) {
    throw new Error("API_CRN_COORDINATORTABLE_NAME is not set");
  }
  const result = await docClient
    .get({
      TableName: tableName,
      Key: { id: coordinatorId },
    })
    .promise();
  const coordinator = result.Item;
  if (!coordinator || coordinator.enabled === false || !coordinator.email) {
    return null;
  }
  return coordinator.email;
}

async function getTeamsForNeedType(needType) {
  const tableName = process.env.API_CRN_TEAMTABLE_NAME;
  if (!tableName) {
    throw new Error("API_CRN_TEAMTABLE_NAME is not set");
  }
  const teams = [];
  let lastEvaluatedKey;
  do {
    const result = await docClient
      .query({
        TableName: tableName,
        IndexName: "byTeamType",
        KeyConditionExpression: "teamType = :teamType",
        ExpressionAttributeValues: { ":teamType": needType },
        ExclusiveStartKey: lastEvaluatedKey,
      })
      .promise();
    teams.push(...(result.Items || []));
    lastEvaluatedKey = result.LastEvaluatedKey;
  } while (lastEvaluatedKey);
  return teams;
}

/**
 * Returns deduplicated coordinator emails for teams matching any of the need types.
 */
async function resolveCoordinatorEmailsForNeedTypes(needTypes) {
  const uniqueNeedTypes = [...new Set(needTypes || [])];
  const emails = new Set();
  const teamsWithoutCoordinator = [];

  for (const needType of uniqueNeedTypes) {
    const teams = await getTeamsForNeedType(needType);
    for (const team of teams) {
      if (!team.coordinatorID) {
        teamsWithoutCoordinator.push(`${team.teamName || team.id} (${needType})`);
        continue;
      }
      const email = await getCoordinatorEmail(team.coordinatorID);
      if (email) {
        emails.add(email);
      }
    }
  }

  if (teamsWithoutCoordinator.length > 0) {
    console.warn(
      `Teams without coordinator assignment (no vetted email): ${teamsWithoutCoordinator.join(", ")}`
    );
  }

  return [...emails];
}

module.exports = {
  resolveCoordinatorEmailsForNeedTypes,
};
