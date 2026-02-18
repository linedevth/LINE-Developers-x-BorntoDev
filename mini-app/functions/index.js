/* 0. Initial */
// 0.1. Install dependencies
// 0.2. Rename .env.sample to .env
// 0.3. Fill out values in .env file

const {onRequest} = require("firebase-functions/https");
const line = require("./utils/line");

exports.serviceMessage = onRequest({ cors: "*" }, async (req, res) => {
  /* 1. Get and verify LIFF access token */
  // 1.1. Get LIFF access token
  // 1.2. Verify LIFF access token
  // 1.3. Ensure LIFF access token

  /* 2. Issue a channel access token */

  /* 3. Set request headers */

  /* 4. Issue a service notification token */

  /* 5. Send a service message */
});