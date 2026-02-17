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

    // const sheet = doc.sheetsByTitle[sheetName];
    // console.log("Sheet name:", sheet.title);

    return doc;
};

export async function createNewWorksheet(sheetName) {
    const doc = await accessSpreadsheet();
    const sheet = doc.addSheet(sheetName);

    console.log("Sheet added succesfully.")
    
    // create new worksheet for different days
}

export async function appendRow(raw, sheetName) {
    // load spreadsheet
    const doc = await accessSpreadsheet(sheetName);
    const sheet = doc.sheetsByTitle[sheetName];

    // Append row to DB
    const row = await sheet.addRow(raw);

    // get row number
    const orderId = row.rowNumber;
    // set orderId as row number
    row.set("orderId", orderId);

    const today = new Date();
    row.set("timestamp", format(today, "dd-MM-yyyy"));

    // save changes
    await row.save();

}

export async function getOrders(sheetName) {
    const doc = await accessSpreadsheet(sheetName);
    const sheet = doc.sheetsByTitle[sheetName];


    const rows = await sheet.getRows();
    let orders = [];

    rows.forEach( row => {
        orders.push(row.toObject());
    });

    return orders
};

