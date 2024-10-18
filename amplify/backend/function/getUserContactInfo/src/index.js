/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	BREEZE_INFO
Amplify Params - DO NOT EDIT */
const axios = require("axios");
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const extractMobilePhoneNumber = (data) => {
  // Check if 'details' and the nested 'phone' array exist
  if (data && data.details && data.details["404925024"]) {
    // Loop through the phone entries to find a mobile number
    for (const phoneEntry of data.details["404925024"]) {
      if (
        phoneEntry.field_type === "phone" &&
        phoneEntry.phone_type === "mobile"
      ) {
        return phoneEntry.phone_number; // Return the mobile phone number
      }
    }
  }
  // Return null if no mobile phone number is found
  return null;
};

exports.handler = async (event) => {
  let breezeInfo = process.env.BREEZE_INFO;
  const { id } = event;
  const getPerson = async (teamId) => {
    const url = `https://servereedley.breezechms.com/api/people/${id}"}`;
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
    let result = await getPerson(teamId);
    return {
      statusCode: 200,
      body: JSON.stringify({
        mobileNumber: extractMobilePhoneNumber(result.data),
      }),
    };
  } catch (e) {
    return { statusCode: 500, body: e.stack };
  }
};
