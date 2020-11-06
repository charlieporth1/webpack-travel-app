module.exports.startWebServer = function startWebServer() {
    const port = process.env.FRONT_END_PORT || 8000;
    const host = process.env.HOST || "localhost";
    const https = require("https");
    const fs = require('fs');
    const path = require('path');
    const appDir = path.dirname(require.main.filename + "/website/");

    const options = {
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem')
    };

    https.createServer(options, function (req, res) {
        res.writeHead(200);
    }).listen(port, host + "/website/index.html");
}
