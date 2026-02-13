import 'dotenv/config'

export const env = {
    googleServiceEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    googlePrivateKey: process.env.GOOGLE_PRIVATE_KEY,
    googleSheetsID: process.env.GOOGLE_SHEET_ID
}