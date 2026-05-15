const express = require("express");
const appInsights = require("applicationinsights");
const winston = require("winston");

const app = express();
const port = process.env.PORT || 3000;

// Application Insights
if (process.env.APPLICATIONINSIGHTS_CONNECTION_STRING) {
    appInsights.setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING)
        .setAutoCollectRequests(true)
        .setAutoCollectPerformance(true)
        .setAutoCollectExceptions(true)
        .setAutoCollectDependencies(true)
        .setAutoDependencyCorrelation(true)
        .setUseDiskRetryCaching(true)
        .start();
}

// Logger
const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.Console()
    ]
});

// Routes
app.get("/", (req, res) => {
    logger.info("Home page accessed");
    res.send("Azure Monitoring Demo App");
});

app.get("/error", (req, res) => {
    logger.error("Error endpoint hit");

    throw new Error("Sample Application Error");
});

app.get("/health", (req, res) => {
    res.json({
        status: "UP"
    });
});

app.listen(port, () => {
    logger.info(`App running on port ${port}`);
    console.log(`Server started on port ${port}`);
});