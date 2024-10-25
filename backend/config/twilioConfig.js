// twilioConfig.js
const twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Twilio Account SID
const authToken = process.env.TWILIO_AUTH_TOKEN;     // Twilio Auth Token
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID; // Twilio Verify Service SID

const client = twilio(accountSid, authToken);

module.exports = { client, verifyServiceSid };
