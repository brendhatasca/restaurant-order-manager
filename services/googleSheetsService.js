import {format} from 'date-fns';
import {env} from '../config/env.js'
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { se } from 'date-fns/locale';

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
    // Creates new worksheet (new event)

    const doc = await accessSpreadsheet();

    console.log(sheetName);

    const existingSheet = doc.sheetsByTitle[sheetName];

    if (existingSheet) {
        console.log(`Sheet ${sheetName} already exists.`)
        return existingSheet
    };

    const newSheet = await doc.addSheet({
        title: sheetName,
        headerValues: [
        "timestamp",
        "orderId",
        "pickupTime",
        "customerName",
        "phone",
        "cookedFood",
        "rawSeafood",
        "oysters",
        "platters",
        "notes"
        ]
    });

    console.log("Sheet created succesfully.");
};

export async function appendRow(raw, sheetName) {
    // load spreadsheet
    const doc = await accessSpreadsheet();
    const sheet = doc.sheetsByTitle[sheetName];
    console.log(raw)
    // Append row to DB
    const row = await sheet.addRow(raw);

    // get row number
    const orderId = row.rowNumber;
    // set orderId as row number
    row.set("orderId", orderId);

    // set timestamp for when order was created
    const today = new Date();
    row.set("timestamp", format(today, "dd-MM-yyyy"));

    // save changes
    await row.save();

}

export async function getOrders(sheetName) {
    const doc = await accessSpreadsheet();
    const sheet = doc.sheetsByTitle[sheetName];

    const rows = await sheet.getRows();
    let orders = [];

    rows.forEach( row => {
        orders.push(row.toObject());
    });

    // sort rows by pickup time before returning it
     orders.sort((a, b) => {
        const toMinutes = t => {
            const [h, m] = t.split(':').map(Number);
            return h * 60 + m;
        };
        return toMinutes(a.pickupTime) - toMinutes(b.pickupTime);
    });

    return orders;
};

/**
 * Retrieve order by given ID.
 *
 * @param {string} sheetName - Name of the sheet that contains the order.
 * @param {number} orderId - ID of the order to be retrieved.
 * @returns {object} The order that matches the ID.
 */
export async function getOrderById(sheetName, orderId) {
    console.log(sheetName, orderId)
    const doc = await accessSpreadsheet();
    const sheet = doc.sheetsByTitle[sheetName];

    const rows = await sheet.getRows();

    const match = rows.find(row => row.get('orderId') == orderId);
    return match ? match.toObject() : null;
}

export async function getWorksheets() {
    const doc = await accessSpreadsheet();
    const sheets = doc.sheetsByIndex;
    let titles = [];

    sheets.forEach(sheet => {
        titles.push(sheet._rawProperties.title);
    })

    return titles;
}