// Only gonna start listening for requests at the given port

import app from "./src/app.js";

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
export default app;