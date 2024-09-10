const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { google } = require('googleapis');
const fs = require('fs');

// Initialize Firebase Admin SDK
admin.initializeApp();

const db = admin.firestore();

// Load Google Sheets API credentials
const sheetsCredentials = require('./sheets-credentials.json');

// Authenticate with Google Sheets API
async function authenticateGoogleSheets() {
  const auth = new google.auth.GoogleAuth({
    keyFile: './sheets-credentials.json', // Path to your service account key file
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const authClient = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: authClient });

  return sheets;
}

// Function to add new subscriber data to Google Sheets
async function addSubscriberToGoogleSheet(sheetId, subscriber) {
  const sheets = await authenticateGoogleSheets();

  const values = [[subscriber.name, subscriber.phoneNumber]];

  // Append data to the sheet
  const request = {
    spreadsheetId: sheetId,
    range: 'Sheet1!A1',  // Assuming data starts from A1
    valueInputOption: 'RAW',
    resource: {
      values: values,
    },
  };

  try {
    const response = await sheets.spreadsheets.values.append(request);
    console.log(`${response.data.updates.updatedCells} cells appended.`);
  } catch (error) {
    console.error('Error appending to Google Sheets:', error);
  }
}

// Cloud function to listen for new subscribers in Firestore
exports.onNewSubscriber = functions.firestore
  .document('subscribers/{subscriberId}')
  .onCreate(async (snap, context) => {
    const newSubscriber = snap.data();
    const sheetId = 'YOUR_GOOGLE_SHEET_ID';  // Replace with your Google Sheets ID

    console.log('New subscriber added:', newSubscriber);
    
    // Add the new subscriber to Google Sheets
    await addSubscriberToGoogleSheet(sheetId, newSubscriber);
  });
