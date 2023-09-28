const http = require("http");
const https = require("https");
const fs = require("fs");

const finalhandler = require('finalhandler');
const serveStatic = require('serve-static');
const { createLogger, configureLogger } = require("vant-environment/log");

const log = createLogger();
configureLogger(log, {
    consoleLog: true,
    fileLog: true,
    logLevel: "info"
}, "vant-gui");

require('dotenv').config()

var serve = serveStatic("./build");

const useSSL = process.env.HTTPS === "true";

let servers = [];
if (useSSL) {
    servers[0] = https.createServer({ cert: fs.readFileSync(process.env.SSL_CRT_FILE), key: fs.readFileSync(process.env.SSL_KEY_FILE) }, (req, res) => {
        log.info(`HTTPS Request: ${req.method} ${req.url}`);
        const done = finalhandler(req, res);
        serve(req, res, done);
    }).listen(443);

    servers[1] = http.createServer((req, res) => {
        log.info("Redirecting http request to https server!");
        res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
        res.end();
    }).listen(80);
} else {
    servers[0] = http.createServer((req, res) => {
        log.info(`HTTP Request: ${req.method} ${req.url}`);
        const done = finalhandler(req, res);
        serve(req, res, done);
    }).listen(80);
}

// do something when app is closing
process.on('exit', () => {
    log.info("Exiting!");
});


async function shutdownGracefully() {
    log.info("Shutting down gracefully...");
    for (const server of servers) {
        await server.close();
    }
    log.info("Closed servers!");
    process.exit();
}

// catches ctrl+c event
process.on('SIGINT', () => {
    log.warn("Received SIGINT event!");
    shutdownGracefully();
});

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', () => {
    log.warn("Received kill (SIGNUSR1) signal!");
    shutdownGracefully();
});
process.on('SIGUSR2', () => {
    log.warn("Received kill (SIGNUSR2) signal!");
    shutdownGracefully();
});
process.on('SIGTERM', () => {
    log.warn("Received kill (SIGTERM) signal!");
    shutdownGracefully();
});

// catches uncaught exceptions
process.on('uncaughtException', (err) => {
    log.error("Uncaught exception!");
    log.error(err);
    shutdownGracefully();
});