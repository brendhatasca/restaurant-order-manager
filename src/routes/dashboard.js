// Handles routes to dashboard

import express from "express";
const router = express.Router();
import { createNewWorksheet, getWorksheets } from "../../services/googleSheetsService.js";

const slugify = (name) => name.replace(/\s+/g, '-').toLowerCase();

router.get("/", async (req, res) => {
    const sheets = await getWorksheets();
    res.render("main/dashboard", { sheets, slugify });
})

// route handler for POST req from frontend to the GoogleSheets api
router.post("/api/create-sheet", async (req, res) => {
    const { sheetName } = req.body;
    await createNewWorksheet(sheetName);
    res.json({ success: true });
});

export default router;