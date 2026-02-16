import express from "express";
const router = express.Router();

import { appendRow } from "../../services/googleSheetsService.js";

// route handler for HTTP GET req to the root path
router.get("/", (req, res) => {
    res.send("Orders directory");
});

// route handler for HTTP get req for the new order page
router.get("/new", (req, res) => {
    res.render("orders/newOrder", { firstName: "Brendha"});
});

// route handler for HTTP POST req from /new path
router.post("/", (req, res) => {
    console.log(req.body);
    res.send("Order created");
    appendRow(req.body)
});



export default router