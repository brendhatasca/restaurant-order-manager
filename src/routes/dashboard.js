// Handles routes to dashboard

import express from "express";
const router = express.Router();
import { slugToTitleCase, slugify } from "../../helpers/formatString.js";
import { createNewWorksheet, getWorksheets } from "../../services/googleSheetsService.js";

// renders dashboard page with current dashboard events
router.get("/", async (req, res) => {
    const sheets = await getWorksheets();
    res.render("main/dashboard", { sheets, slugToTitleCase });
})

// route handler for POST req from frontend to the GoogleSheets api
router.post("/api/create-sheet", async (req, res) => {
    const { sheetName } = req.body;
    await createNewWorksheet(slugify(sheetName));
    res.json({ success: true });
});

export default router;