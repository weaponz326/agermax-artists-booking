const axios = require("axios");
const qs = require("qs");
dotenv = require("dotenv");
dotenv.config();

const CLIENT_ID = process.env.VISMA_CLIENT_ID;
const CLIENT_SECRET = process.env.VISMA_CLIENT_SECRET;
const TOKEN_ENDPOINT =
  "https://identity-sandbox.test.vismaonline.com/connect/token";
const SCOPES = "ea:api ea:sales ea:purchase ea:accounting offline_access";

async function getVismaToken() {
  const requestBody = {
    grant_type: "client_credentials",
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    scope: SCOPES,
  };

  try {
    const response = await axios.post(
      TOKEN_ENDPOINT,
      qs.stringify(requestBody),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Error obtaining Visma access token:", error);
    throw error;
  }
}

module.exports = getVismaToken;
