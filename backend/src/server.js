const express = require('express');
const app = express();

const dbMiddle = require('./middleware/database.middleware');
const auth = require('./middleware/auth.middleware');
const cors = require('cors')

const routes = require('./routes');

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(dbMiddle);

// Todas as requisições OPTIONS retornam 200
app.options('*', (req, res) => {
    res.json({
        status: 200
    });
});

app.use(routes);

module.exports = app;

