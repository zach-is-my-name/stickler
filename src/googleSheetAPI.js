import { GoogleSpreadsheet } from 'google-spreadsheet';
const clientEmail = process.env.REACT_APP_CLIENT_EMAIL;
const privateKey = process.env.REACT_APP_PRIVATE_KEY;
const spreadsheetId = process.env.REACT_APP_SPREADSHEET_ID;
const doc = new GoogleSpreadsheet(spreadsheetId);

// Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
async function accessSpreadsheet() {
  await doc.useServiceAccountAuth({
    client_email: clientEmail ,
    private_key: privateKey ,
  });

  await doc.loadInfo(); // loads document properties and worksheets
  return doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
}

export async function addRowToSheet(data) {
  const sheet = await accessSpreadsheet();
  await sheet.addRow(data);
}
