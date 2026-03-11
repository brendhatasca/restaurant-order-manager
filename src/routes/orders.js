import express from "express";
const router = express.Router();

import { slugToTitleCase } from "../../helpers/formatString.js";
import { formatCreatedAt, formatPickupTime } from "../../helpers/formatDate.js";
import { appendRow, getOrders, getOrderById, deleteOrder, updateOrderById } from "../../services/googleSheetsService.js";

// route handler for HTTP GET req to the root path
router.get("/", (req, res) => {
    res.redirect("/dashboard");
});

router.param("sheet_title", (req,res, next, sheetTitle) => {
    req.sheet = { sheetTitle }
    next()
});

router.param("order_id", (req, res, next, order_id) => {
    req.orderId = {order_id}
    next();
});

router.get("/:sheet_title/:order_id/edit", async (req, res) => {
    const sheetTitle = req.params.sheet_title;
    const orderId = req.params.order_id;

    const order = await getOrderById(sheetTitle, orderId)

    res.render("orders/updateOrder", { sheetTitle, order, formatPickupTime })
})


router.delete("/:sheet_title/api/delete-order", async (req, res) => {
    const sheetName = req.body.sheetName;
    const orderId = req.body.orderId;
    console.log(sheetName, orderId)
    try {
        await deleteOrder(sheetName, orderId)
        res.status(200).json({ 
            success: true,
            orderId: orderId 
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Could not delete order."
        })
    }
})

// route handler for HTTP get req for the new order page
router.get("/:sheet_title/new", (req, res) => {
    const sheetTitle = req.params.sheet_title;
    res.render("orders/newOrder", { firstName: "Brendha", sheetTitle });
});

// route handler for order details
router.route("/:sheet_title/:order_id")
    .get(async (req, res) => {
        try {
            const sheetTitle = req.params.sheet_title;
            const orderId = req.params.order_id;
            const order = await getOrderById(sheetTitle, orderId);
            res.render("orders/orderDetail", { order, orderId, sheetTitle, formatPickupTime })
        } catch (err) {
            console.log(err);
            res.status(500).send("Failed to retrieve order.")
        }
    })
    .post(async (req, res) => {
        try {
            console.log("hey")
            const sheetTitle = req.params.sheet_title;
            const orderId = req.params.order_id;
            console.log(orderId, sheetTitle) // ok
            console.log(req.body)
            await updateOrderById(sheetTitle, orderId, req.body)
            res.redirect(`/orders/${sheetTitle}/${orderId}`)
        } catch (err) {
            res.status(500).send("Failed to update order.")
        }
    })

// route handler for GET request to specific event
router.route("/:sheet_title")
    .get(async (req, res) => {
        try {
            const sheetTitle = req.params.sheet_title;
            const orders = await getOrders(sheetTitle);
            res.render("orders/allOrders", { sheetTitle, orders, formatCreatedAt, formatPickupTime, slugToTitleCase });
        } catch (error) {
            console.log(error);
            res.status(500).send("Failed to load orders.")
        }
    })
    .post(async (req, res) =>{
        try {
            await appendRow(req.body, req.params.sheet_title);
            res.redirect(`/orders/${req.params.sheet_title}`);
        } catch (error) {
            console.log(error);
            res.status(500).send("Failed to create order.")
        } 
    });




export default router