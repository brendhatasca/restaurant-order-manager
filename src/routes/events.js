import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    res.render("main/dashboard")
})

router.post('/api/create-sheet', async (req, res) => {
  console.log('hit /api/create-sheet');
});

// route handler for POST req from frontend to the GoogleSheets api
router.post("/api/create-sheet", (req, res) => {
    createNewWorksheet(req.body);
    res.json({ success: true });
})

export default router;