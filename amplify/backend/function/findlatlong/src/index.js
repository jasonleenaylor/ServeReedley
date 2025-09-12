import NodeGeocoder from "node-geocoder";
 /**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {
  const apiKey = process.env.GEOCODING_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GEOCODING_API_KEY env var");
  }
  const { address } = event;
  const options = {
    provider: 'google',
 
    // Optional depending on the providers
    apiKey: apiKey
  };
  const geocoder = NodeGeocoder(options);
  const geoResponse = await geocoder.geocode(address);

  return {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
    body: JSON.stringify(geoResponse),
  };
};