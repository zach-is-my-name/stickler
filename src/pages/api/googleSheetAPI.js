import { GoogleSpreadsheet } from 'google-spreadsheet';

const clientEmail = process.env.CLIENT_EMAIL;
const privateKey = process.env.PRIVATE_KEY;
const spreadsheetId = process.env.SPREADSHEET_ID;
const doc = new GoogleSpreadsheet(spreadsheetId);

async function accessSpreadsheet() {
  await doc.useServiceAccountAuth({
    client_email: clientEmail,
    private_key: privateKey,
  });

  await doc.loadInfo(); // loads document properties and worksheets
  return doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
}

// async function fetchData() {
//   const sheet = await accessSpreadsheet();
//   // Assuming your sheet has a method to fetch data
//   const data = await sheet.getRows(); 
//   return data;
// }

async function addRowToSheet(data) {
  const sheet = await accessSpreadsheet();
  await sheet.addRow({
    Date: data.Date,
    'Time Allocated': data['Time Allocated'],
    'Actual Time': data['Actual Time'],
    'Time Completed': data['Time Completed'],
    'Session Applications': data['Session Applications'],
    'Total Applications': data['Total Applications'],
  });
}

export default async function handler(req, res) {
  switch (req.method) {
    // case 'GET':
    //   const data = await fetchData();
    //   res.status(200).json({ data });
    //   break;
    case 'POST':
      const body = req.body;
      await addRowToSheet(body);
      res.status(200).json({ message: 'Row added successfully' });
      break;
    default:
      res.setHeader('Allow', [/*['GET'],*/ 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
