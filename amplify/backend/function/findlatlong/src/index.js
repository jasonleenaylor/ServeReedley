import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import NodeGeocoder from "node-geocoder";
 /**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {
  const secret_name = "geocoding-api-key";
 
  const client = new SecretsManagerClient({
    region: "us-west-1",
  });
 
  let response;
 
  try {
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
      })
    );
  } catch (error) {
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    throw error;
  }
 
  const secret = response.SecretString;
  const { address } = event;
  const options = {
    provider: 'google',
 
    // Optional depending on the providers
    apiKey: JSON.parse(secret)['key']
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