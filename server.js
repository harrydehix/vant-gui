const http = require("http");
const https = require("https");
const fs = require("fs");

const finalhandler = require('finalhandler');
const serveStatic = require('serve-static');

require('dotenv').config()

var serve = serveStatic("./build");

const useSSL = process.env.HTTPS === "true";

if (useSSL) {
    https.createServer({ cert: fs.readFileSync(process.env.SSL_CRT_FILE), key: fs.readFileSync(process.env.SSL_KEY_FILE) }, (req, res) => {
        const done = finalhandler(req, res);
        serve(req, res, done);
    }).listen(443);

    http.createServer((req, res) => {
        res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
        res.end();
    }).listen(80);
} else {
    http.createServer((req, res) => {
        const done = finalhandler(req, res);
        serve(req, res, done);
    }).listen(80);
}