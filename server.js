// Only gonna start listening for requests at the given port

// import app from "./src/app.js";
import { env } from "./config/env.js";

app.listen(env.port, () => {
    console.log(`Listening on port ${env.port}...`)
})