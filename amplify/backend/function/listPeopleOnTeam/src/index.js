/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	BREEZE_INFO
Amplify Params - DO NOT EDIT */
const axios = require("axios");
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  let breezeInfo = process.env.BREEZE_INFO;
  const { teamId } = event;
  const getPeopleOnTeam = async (teamId) => {
    const url = `https://servereedley.breezechms.com/api/people?filter_json={"2141362012":"${teamId}"}`;
    let response = undefined;
    try {
      response = await axios.get(url, {
        headers: {
          "Api-Key": `${breezeInfo}`,
        },
      });
    } catch (e) {
      console.log(`${url}" : failed with: ${e}`);
      throw e;
    }
    return response;
  };

  try {
    let result = await getPeopleOnTeam(teamId);
    return {
      statusCode: 200,
      body: JSON.stringify(result.data),
    };
  } catch (e) {
    return { statusCode: 500, body: e.stack };
  }
};
