import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import dashboardRouter from "./routes/dashboard.js";
import ordersRouter from "./routes/orders.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// to parse request body from HTML forms
app.use(express.urlencoded( {extended: true } ));
// to parse JSON req bodies
app.use(express.json())
// mount middleware to automatically serve static files from public dir
app.use(express.static(path.join(__dirname, '../public')));
// set up template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, '../views'));

app.get("/", (req, res) => {
    res.redirect("/dashboard");
});

app.use("/dashboard", dashboardRouter)

app.use("/orders", ordersRouter);

export default app;