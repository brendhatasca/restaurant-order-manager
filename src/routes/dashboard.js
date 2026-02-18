// Handles routes to dashboard

import express from "express";
const router = express.Router();
import { createNewWorksheet } from "../../services/googleSheetsService.js";

router.get("/", (req, res) => {
    res.render("main/dashboard")
})

// route handler for POST req from frontend to the GoogleSheets api
router.post("/api/create-sheet", async (req, res) => {
    const { sheetName } = req.body;
    await createNewWorksheet(sheetName);
    res.json({ success: true });
});

export default router;