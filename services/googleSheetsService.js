import {format} from 'date-fns';
import {env} from '../config/env.js'
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function accessSpreadsheet() {
    const SCOPES = [
        'https://www.googleapis.com/auth/spreadsheets'
    ];

    const serviceAccount = new JWT({
        email: env.googleServiceEmail,
        key: env.googlePrivateKey,
        scopes: SCOPES
    });

    const doc = new GoogleSpreadsheet(env.googleSheetsID, serviceAccount);

    await doc.loadInfo();
    console.log("Connected to:", doc.title);

    const sheet = doc.sheetsByIndex[0];
    console.log("Sheet name:", sheet.title);

    return {
        doc,
        sheet
    };
};

const customer1 = {
  fullName: 'Brendha',
  phone: '437-971-6848',
  pickupTime: '08:15',
  cookedFood: 'food here'
}

export async function appendRow(raw) {
    const { doc, sheet } = await accessSpreadsheet();
    // const { fullName, phone, pickupTime, cookedFood, rawSeafood, oysters, notes } = raw

    await sheet.addRow(raw)

    const rows = await sheet.getRows();
    console.log(rows[0])
    console.log(rows[1])
}