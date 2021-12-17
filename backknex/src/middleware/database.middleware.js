const dbConnection = require('../database/index');
module.exports = async (req, res, next) => {
    if (skipUrls(req.url)) return next();

    try {
        res.locals.connection = dbConnection.getConnection();
    } catch (error) {
        console.log(`[ERROR] Connection error in middleware `);
        console.log(error);
        return res.status(500).json({ status: 1, message: 'Connection error in middleware', error: error.message });
    }
    return next();
}

function skipUrls(url) {
    console.log(url);
    if (url == "/") return true;
}
