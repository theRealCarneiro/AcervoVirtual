require('dotenv').config();
const app = require('./src/server')

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`[INFO] Server Created on http://localhost:${port} - ${process.env.NODE_ENV}`);
})
