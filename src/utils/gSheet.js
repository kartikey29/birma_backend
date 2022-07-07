const { google } = require("googleapis");
const path = require("path");
const googleSheetsInstance = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.resolve(__dirname + "/keys.json"), //the key file
    //url to spreadsheets API
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const authClientObject = await auth.getClient();

  const googleSheetsInstance = google.sheets({
    version: "v4",
    auth: authClientObject,
  });

  //send the data read with the response
  return { googleSheetsInstance, auth };
};

module.exports = googleSheetsInstance;
