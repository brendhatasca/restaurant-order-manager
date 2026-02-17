import express from "express";
const router = express.Router();

router.post('/api/create-sheet', async (req, res) => {
  console.log('hit /api/create-sheet');
});

import { appendRow, getOrders, createNewWorksheet } from "../../services/googleSheetsService.js";

// route handler for HTTP GET req to the root path
router.get("/", (req, res) => {
    res.send("Orders directory");
});

// route handler for POST req from frontend to the GoogleSheets api
router.post("/api/create-sheet", (req, res) => {
    createNewWorksheet(req.body);
    res.json({ success: true });
})

// route handler for HTTP get req for the new order page
router.get("/new", (req, res) => {
    res.render("orders/newOrder", { firstName: "Brendha"});
});

// route handler for HTTP POST req from /new path
router.post("/", async (req, res) => {
    console.log(req.body);
    // CHANGE SHEET1 STRING TO VARIABLE THAT HAS SHEET TITLE STORE
    await appendRow(req.body, "Sheet1");
    res.send("Order created");
    await getOrders("Sheet1");
});



export default router