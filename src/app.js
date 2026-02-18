import express from 'express';
const app = express();

// to parse request body from HTML forms
app.use(express.urlencoded( {extended: true } ));
// to parse JSON req bodies
app.use(express.json())
// mount middleware to automatically serve static files from public dir
app.use(express.static("public"));
// set up template engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.redirect("/dashboard");
});

import dashboardRouter from "./routes/dashboard.js";

app.use("/dashboard", dashboardRouter)

import ordersRouter from "./routes/orders.js";

app.use("/orders", ordersRouter);





export default app