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
  const { teamId } = event;
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const getPeopleOnTeam = async (teamId) => {
    const api = axios.create({
      baseURL: "https://servereedley.breezechms.com/api/",
      headers: {
        "Api-Key": "e20e34f5a9dd9b7a82550ec721b9fb95",
      },
    });
    const filterArgs = { 2141362012: `${teamId}` };
    console.log(JSON.stringify(filterArgs));
    let response = await api.get("/people", {
      params: { filter_json: `${JSON.stringify(filterArgs)}` },
    });
    return JSON.stringify(response.body.data);
  };

  try {
    let result = await getPeopleOnTeam(teamId);
    return {
      statusCode: 200,
      body: JSON.stringify(result.body),
    };
  } catch (e) {
    return { statusCode: 500, body: e };
  }
};
